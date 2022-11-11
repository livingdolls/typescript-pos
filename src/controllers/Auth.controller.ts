import { NextFunction, Request, Response } from "express";
import { CreateUserType } from "../schema/Auth.schema";
import { CreateUser } from "../services/Auth.service";
import { response } from "../utils/CustomResponse";
import { HashString } from "../utils/HashString";

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
