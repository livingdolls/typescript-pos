import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getRefreshToken } from "../services/Auth.service";
import { getOneUsers } from "../services/User.service";
import { response } from "../utils/CustomResponse";

export interface CustomRequest extends Request {
	token: string;
}

export type IPatyload = {
	_id_user: string;
	iat: number;
	exp: number;
};

export const VerifyToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"];
	const token: any = authHeader && authHeader.split(" ")[1];

	if (token === null) {
		return response(401, false, [], "you not autheticanted!", res);
	}

	try {
		const tokenValidate = jwt.verify(
			token,
			process.env.TOKEN_SECRET || "supersecret"
		) as IPatyload;

		(req as CustomRequest).token = tokenValidate._id_user;

		next();
	} catch (error) {
		return response(401, false, [], "you not autheticanted!", res);
	}
};

export const VerifySuperAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	VerifyToken(req, res, async () => {
		const _id = (req as CustomRequest).token;
		const data = { _id_user: _id };

		const findUser: any = await getOneUsers(data);
		if (findUser[0].isSuperAdmin === 0) {
			return response(403, false, [], "access denied!", res);
		}

		next();
	});
};

export const RefreshToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		console.log(req.cookies.refreshToken);
		if (!refreshToken) res.sendStatus(401);

		const findUser: any = await getRefreshToken(refreshToken);
		if (findUser.length === 0) res.sendStatus(404);
		const { _id_user, nama, email, isSuperAdmin } = findUser[0];

		try {
			const refresh = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN || "refreshsupersecret"
			);

			const accessToken = jwt.sign(
				{ _id_user, nama, email, isSuperAdmin },
				process.env.TOKEN_SECRET || "supersecret",
				{ expiresIn: "25s" }
			);

			res.json({ accessToken });
		} catch (error) {
			res.sendStatus(403);
		}
	} catch (error: any) {
		throw new Error(error);
	}
};
