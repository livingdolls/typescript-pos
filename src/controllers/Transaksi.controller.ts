import { NextFunction, Request, Response } from "express";
import {
	createMainTransaksiType,
	deleteMasterTransaksiType,
} from "../schema/master_transaksi.schema";
import {
	deleteTransaksiService,
	findTransaksiService,
	getTransaksiService,
	postTransaksiService,
} from "../services/Transaksi.service";
import { response } from "../utils/CustomResponse";

export const getAllTransaksi = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = await getTransaksiService();

		return response(201, true, data, "get all transaksi!", res);
	} catch (error: any) {
		return response(500, false, error, "failed get transaksi!", res);
	}
};

export const postTransaksi = async (
	req: Request<{}, {}, createMainTransaksiType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const data = req.body;
		const post_data = await postTransaksiService(data);

		return response(201, true, [], post_data.msg, res);
	} catch (error: any) {
		return response(500, false, error, "failed created transaksi!", res);
	}
};

export const deleteTransaksi = async (
	req: Request<deleteMasterTransaksiType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const find: any = await findTransaksiService(req.params);

		if (find.length === 0) {
			return response(404, false, [], "transaksi! not found", res);
		}

		await deleteTransaksiService(req.params);
		return response(201, true, [], "deleted transaksi!", res);
	} catch (error: any) {
		return response(500, false, error, "server error!", res);
	}
};
