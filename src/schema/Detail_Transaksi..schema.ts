import { object, string, TypeOf } from "zod";

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

export const cancelDetailTransaksiSchema = object({
	...payloadParams,
});

export type cancelDetailTransaksiType = TypeOf<
	typeof cancelDetailTransaksiSchema
>["params"];
