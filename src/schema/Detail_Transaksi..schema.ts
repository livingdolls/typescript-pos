import { number, object, string, TypeOf } from "zod";

export type detail_transaksi = {
	_id: number;
	_id_barang: string;
	harga: number;
	qty: number;
	sub_total: number;
};

const payloadParams = {
	params: object({
		_id: string().min(1),
	}),
};

const payloadBody = {
	body: object({
		_id_master_transaksi: number({ required_error: "required!" }),
		_id_barang: string({ required_error: "required id barang!" }),
		harga: number({ required_error: "required harga!" }),
		qty: number({ required_error: "required qty!" }).min(1),
		sub_total: number({ required_error: "required sub total!" }),
	}),
};

export const cancelDetailTransaksiSchema = object({
	...payloadParams,
});

export const detailTransaksiSchema = object({
	...payloadBody,
});

export type cancelDetailTransaksiType = TypeOf<
	typeof cancelDetailTransaksiSchema
>["params"];

export type detailTransaksiType = TypeOf<typeof detailTransaksiSchema>["body"];
