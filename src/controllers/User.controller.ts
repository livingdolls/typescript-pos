import { NextFunction, Request, Response } from "express";
import {
	deleteUserType,
	getOneUserType,
	updateUserType,
} from "../schema/User.schema";
import {
	deleteUserService,
	getAllUser,
	getOneUsers,
	updateUsersService,
} from "../services/User.service";
import { response } from "../utils/CustomResponse";

export const getAllUsers = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const users = await getAllUser();

		response(201, true, users, "Get all users!", res);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const findUser = async (
	req: Request<getOneUserType["params"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const data: any = await getOneUsers(req.params);

		if (data.length === 0) {
			return response(404, false, [], "User not found!", res);
		}

		response(201, true, data, "get one users!", res);
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (
	req: Request<deleteUserType["params"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const data: any = await getOneUsers(req.params);

		if (data.length === 0) {
			return response(404, false, [], "User not found!", res);
		}

		await deleteUserService(req.params);

		response(201, true, [], "User deleted success!", res);
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (
	req: Request<updateUserType["params"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const data: any = await getOneUsers(req.params);

		if (data.length === 0) {
			return response(404, false, [], "User not found!", res);
		}

		const up = updateUsersService(req.params, req.body);
		response(201, true, [], "User updated success!", res);
	} catch (error) {
		next(error);
	}
};
