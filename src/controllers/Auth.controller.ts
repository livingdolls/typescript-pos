import { NextFunction, Request, Response } from "express";
import { CreateUserType, LoginUserType } from "../schema/Auth.schema";
import {
	CreateUser,
	FindUser,
	getRefreshToken,
	RefreshToken,
} from "../services/Auth.service";
import { response } from "../utils/CustomResponse";
import { ComparePassword, HashString } from "../utils/HashString";
import jwt from "jsonwebtoken";

export const Registrasi = (
	req: Request<{}, {}, CreateUserType["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const password = HashString(req.body.password);
		const data = {
			nama: req.body.nama,
			email: req.body.email,
			password: password,
		};

		const CreateUsers = CreateUser(data);
		response(201, true, [], "Berhasil menambah data user!", res);
	} catch (error) {
		next(error);
	}
};

export const Login = async (
	req: Request<{}, {}, LoginUserType["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const findUser: any = await FindUser(req.body);

		if (findUser.length === 0) {
			return response(404, false, [], "user not found!", res);
		}

		// Compare password input user dengan database
		const matchPassword = await ComparePassword(
			req.body.password,
			findUser[0].password
		);

		if (!matchPassword) {
			return response(401, false, [], "wrong password!", res);
		}

		const { _id_user, nama, email, isSuperAdmin } = findUser[0];
		const token = process.env.TOKEN_SECRET || "supersecret";
		const refresh = process.env.REFRESH_TOKEN || "refreshsupersecret";

		// Buat token
		const accessToken = jwt.sign({ _id_user }, token, { expiresIn: "25s" });

		// buat refreshtoken
		const refreshToken = jwt.sign({ _id_user }, refresh, {
			expiresIn: "1d",
		});

		const reftoken = { _id_user: _id_user, refresh_token: refreshToken };

		// update token database
		const updateToken = await RefreshToken(reftoken);

		// setCookies
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			secure: false,
		});

		res.json({ accessToken });
	} catch (error: any) {
		throw new Error(error);
	}
};

export const Logout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const refreshToken = req.cookies.refreshToken;

	// jika token tidak ada
	if (!refreshToken) res.sendStatus(204);

	// cari user berdasarkan refresh token
	const findUser: any = await getRefreshToken(refreshToken);

	// jika tidak ketemu
	if (findUser.length === 0) res.sendStatus(204);

	// update refresh token null
	const { _id_user } = findUser[0];
	const data = { _id_user: _id_user, refresh_token: null };
	await RefreshToken(data);

	// Clear cookies
	res.clearCookie("refreshToken");
	return res.sendStatus(200);
};
