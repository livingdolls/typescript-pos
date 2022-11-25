import { NextFunction, Request, Response } from "express";
import { cancelDetailTransaksiType } from "../schema/Detail_Transaksi..schema";
import { cancelDetailTransaksiService } from "../services/Detail.transaksi.service";
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
