import { number, object, string, TypeOf } from "zod";

const payloadBody = {
	body: object({
		nama: string({ required_error: "Nama wajib diisi!" }),
		harga: number({ required_error: "Harga wajib diisi!" }).gte(1, "Min 1"),
		qty: number({ required_error: "Qty wajib diisi!" }).gte(1, "Min 1"),
		_id_satuan: string({ required_error: "Satuan wajib diisi!" }),
		_id_kategori: string({ required_error: "Kategori wajib diisi!" }),
	}),
};

const payloadParams = {
	params: object({
		_id_barang: string().min(1),
	}),
};

export const createBarangSchema = object({
	...payloadBody,
});

export const readBarangSchema = object({
	...payloadParams,
});

export const updateBarangSchema = object({
	...payloadParams,
	...payloadBody,
});

export const deleteBarangSchema = object({
	...payloadParams,
});

export type createBarangType = TypeOf<typeof createBarangSchema>;
export type readBarangType = TypeOf<typeof readBarangSchema>;
export type updateBarangType = TypeOf<typeof updateBarangSchema>;
export type deleteBarangType = TypeOf<typeof deleteBarangSchema>;
