import { NextFunction, Request, Response } from "express";
import { cancelDetailTransaksiType } from "../schema/Detail_Transaksi..schema";
import { detailTransaksiType } from "../schema/master_transaksi.schema";
import {
	cancelDetailTransaksiService,
	cancelTransaksiService,
} from "../services/Detail.transaksi.service";
import { findTransaksiService } from "../services/Transaksi.service";
import { response } from "../utils/CustomResponse";

export const cancelDetailTransaksi = async (
	req: Request<cancelDetailTransaksiType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const cancel: any = await cancelDetailTransaksiService(req.params);

		response(cancel.status, true, [], cancel.msg, res);
	} catch (error) {
		return response(500, false, error, "server error!", res);
	}
};

export const cancelTransaksi = async (
	req: Request<detailTransaksiType>,
	res: Response,
	next: NextFunction
) => {
	try {
		const findTransaksi: any = await findTransaksiService(req.params);
		if (findTransaksi.length === 0) {
			return response(404, false, [], "transaksi not found!", res);
		}

		const _id = { _id_master_transaksi: findTransaksi[0]._id };

		const cancel: any = await cancelTransaksiService(_id);

		response(cancel.status, true, [], cancel.msg, res);
	} catch (error) {
		return response(500, false, error, "server error!", res);
	}
};
