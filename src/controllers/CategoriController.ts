import { Request, Response, NextFunction } from "express";
import { CreateError } from "../utils/CreateError.js";
import {
	CreateCategoriType,
	DeleteCategoriType,
	FindCategoriType,
	UpdateCategoriType,
} from "../schema/Categori.schema.js";
import {
	CreateCategori,
	delCategori,
	findCategori,
	getAllCategoris,
	UpdateCategori,
} from "../services/Categori.service.js";
import { response } from "../utils/CustomResponse.js";

export const getAllCategori = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await getAllCategoris();

		response(201, true, data, "get all categori", res);
	} catch (error) {
		next(error);
	}
};

export const addCategori = async (
	req: Request<{}, {}, CreateCategoriType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const Categori = await CreateCategori(req.body);

		response(201, true, [], "Berhasil menambah kategori!", res);
	} catch (error) {
		next(error);
	}
};

export const updateCategori = async (
	req: Request<UpdateCategoriType["params"], {}>,
	res: Response,
	next: NextFunction
) => {
	try {
		const checkFind: Array<UpdateCategoriType["body"]> | any =
			await findCategori(req.params);

		if (checkFind.length === 0) {
			return res
				.status(404)
				.json(CreateError(404, "Kategori tidak ditemukan!"));
		}

		const updateCategori = await UpdateCategori(req.params, req.body);

		res.status(201).json({
			status: 201,
			code: "Success",
			msg: "Berhasil merubah data kategori",
		});
	} catch (error) {
		next(error);
	}
};

export const findOneCategori = async (
	req: Request<FindCategoriType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const findOne: Array<FindCategoriType> | any = await findCategori(
			req.params
		);

		if (findOne.length === 0) {
			return res
				.status(404)
				.json(CreateError(404, "Kategori tidak ditemukan!"));
		}

		res.status(201).json({
			status: 201,
			code: "Success",
			data: findOne,
		});
	} catch (error) {
		next(error);
	}
};

export const deleteCategori = async (
	req: Request<DeleteCategoriType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const findOne: Array<DeleteCategoriType> | any = await findCategori(
			req.params
		);

		if (findOne.length === 0) {
			return res
				.status(404)
				.json(CreateError(404, "Kategori tidak ditemukan!"));
		}

		const del = await delCategori(req.params);

		res.status(201).json({
			status: 201,
			code: "Success",
			msg: "Berhasil menghapus kategori!",
		});
	} catch (error) {
		next(error);
	}
};
