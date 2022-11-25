import { any, array, number, object, string, TypeOf } from "zod";

type detail_transaksi = {
	_id: string;
	_id_barang: string;
	harga: number;
	qty: number;
	sub_total: number;
};

const payloadBody = {
	body: object({
		_id_admin: string({ required_error: "admin required!" }),
		invoice: number().gte(1, "required invoice!"),
		sub_total: number().gte(1, "required sub total!"),
		diskon: number(),
		total: number().gte(1, "total required!"),
		detail_transaksi: any(),
	}),
};

const payloadParams = {
	params: object({
		_id_master_transaksi: string().min(10, {
			message: "transaksi not found!",
		}),
	}),
};

export const createMainTransaksiSchema = object({
	...payloadBody,
});

export const deleteMasterTransaksiSchema = object({
	...payloadParams,
});

export const detailTransaksiSchema = object({
	...payloadParams,
});

export type createMainTransaksiType = TypeOf<
	typeof createMainTransaksiSchema
>["body"];

export type deleteMasterTransaksiType = TypeOf<
	typeof deleteMasterTransaksiSchema
>["params"];

export type detailTransaksiType = TypeOf<
	typeof detailTransaksiSchema
>["params"];
