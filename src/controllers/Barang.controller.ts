import { NextFunction, Request, Response } from "express";
import {
	createBarangType,
	deleteBarangType,
	readBarangType,
	updateBarangType,
} from "../schema/Barang.schema";
import { CreateUser } from "../services/Auth.service";
import {
	allBarangService,
	allBarangServiceReal,
	createBarangService,
	deleteBarangService,
	findBarangService,
	updateBarangService,
} from "../services/Barang.service";
import { response } from "../utils/CustomResponse";

export const getAllBarang = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await allBarangService();

		response(201, true, data, "get all barang success!", res);
	} catch (error) {
		next(error);
	}
};

export const CreateBarang = async (
	req: Request<{}, {}, createBarangType["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const create = await createBarangService(req.body);
		response(201, true, [], "create barang success!", res);
	} catch (error) {
		next(error);
	}
};

export const findBarang = async (
	req: Request<readBarangType["params"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const data: any = await findBarangService(req.params);

		if (data.length === 0) {
			return response(404, false, [], "barang not found!", res);
		}

		response(201, true, data, "find one data success!", res);
	} catch (error) {
		next(error);
	}
};

export const getBarangReal = async (
	req: Request<readBarangType["params"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await allBarangServiceReal(req.params);

		response(201, true, data, "find one data success!", res);
	} catch (error) {
		next(error);
	}
};

export const updateBarang = async (
	req: Request<updateBarangType["params"], {}, updateBarangType["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const data: any = await findBarangService(req.params);

		if (data.length === 0) {
			return response(404, false, [], "barang not found!", res);
		}

		const result = await updateBarangService(req.params, req.body);

		return response(201, true, [], "barang updated success!", res);
	} catch (error) {
		next(error);
	}
};

export const deleteBarang = async (
	req: Request<deleteBarangType["params"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const data: any = await findBarangService(req.params);

		if (data.length === 0) {
			return response(404, false, [], "barang not found!", res);
		}

		await deleteBarangService(req.params);
		return response(201, true, [], "barang deleted success!", res);
	} catch (error) {
		next(error);
	}
};
