import e, { NextFunction, Request, Response } from "express";
import {
	createMainTransaksiType,
	deleteMasterTransaksiType,
} from "../schema/master_transaksi.schema";
import {
	deleteTransaksiService,
	detailTransaksiService,
	findTransaksiService,
	getTransaksiService,
	postTransaksiService,
} from "../services/Transaksi.service";
import { CountTransaksi } from "../utils/CountTransaksi.util";
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
		const ttl_bayar = CountTransaksi(data.detail_transaksi);
		const diskon = (data.diskon / 100) * ttl_bayar;
		const total = ttl_bayar - diskon;

		const new_data = { ...data, sub_total: ttl_bayar, total: total };
		const post_data = await postTransaksiService(new_data);

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

export const detailTransaksi = async (
	req: Request<deleteMasterTransaksiType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const find: any = await findTransaksiService(req.params);

		if (find.length === 0) {
			return response(404, false, [], "transaksi! not found", res);
		}

		const data = await detailTransaksiService(req.params);

		return response(200, true, data, "get detail transaksi!", res);
	} catch (error: any) {
		return response(500, false, error, "server error!", res);
	}
};
