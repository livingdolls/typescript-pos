import { NextFunction, Request, Response } from "express";
import {
	createSatuanType,
	deleteSatuanType,
	readSatuanType,
	updateSatuanType,
} from "../schema/Satuan.schema";
import {
	createSatuanService,
	deleteSatuanService,
	findSatuanService,
	readSatuanService,
	updateSatuanService,
} from "../services/Satuan.service";
import { response } from "../utils/CustomResponse";

export const CreateSatuan = async (
	req: Request<{}, {}, createSatuanType["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const respons = await createSatuanService(req.body);
		console.log(respons);
		response(201, true, [], "created satuan success!", res);
	} catch (error) {
		next(error);
	}
};

export const readSatuan = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await readSatuanService();

		response(201, true, data, "get all data satuan", res);
	} catch (error) {
		next(error);
	}
};

export const findSatuan = async (
	req: Request<readSatuanType["params"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const finds: any = await findSatuanService(req.params);
		console.log(finds);

		if (finds.length === 0) {
			return response(404, false, [], "satuan not found!", res);
		}

		return response(201, true, finds, "get satuan", res);
	} catch (error) {
		next(error);
	}
};

export const updateSatuan = async (
	req: Request<updateSatuanType["params"], {}, updateSatuanType["body"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const finds: any = await findSatuanService(req.params);

		if (finds.length === 0) {
			return response(404, false, [], "satuan not found!", res);
		}

		await updateSatuanService(req.params, req.body);
		return response(201, true, [], "get satuan", res);
	} catch (error) {
		next(error);
	}
};

export const deleteSatuan = async (
	req: Request<deleteSatuanType["params"]>,
	res: Response,
	next: NextFunction
) => {
	try {
		const finds: any = await findSatuanService(req.params);

		if (finds.length === 0) {
			return response(404, false, [], "satuan not found!", res);
		}

		await deleteSatuanService(req.params);
		return response(201, true, [], "deleted satuan success!", res);
	} catch (error) {
		next(error);
	}
};
