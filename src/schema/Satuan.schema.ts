import { object, string, TypeOf } from "zod";

const payloadBody = {
	body: object({
		nama: string({ required_error: "Nama wajib diisi!" }).min(
			3,
			"Minimal 3 huruf"
		),
		keterangan: string({ required_error: "Nama wajib diisi!" }).min(
			3,
			"Minimal 3 huruf"
		),
	}),
};

const payloadParams = {
	params: object({
		_id_satuan: string().min(2, "Invalid data!"),
	}),
};

export const createSatuanSchema = object({
	...payloadBody,
});

export const readSatuanSchema = object({
	...payloadParams,
});

export const updateSatuanSchema = object({
	...payloadParams,
	...payloadBody,
});

export const deleteSatuanSchema = object({
	...payloadParams,
});

export type createSatuanType = TypeOf<typeof createSatuanSchema>;
export type readSatuanType = TypeOf<typeof readSatuanSchema>;
export type updateSatuanType = TypeOf<typeof updateSatuanSchema>;
export type deleteSatuanType = TypeOf<typeof deleteSatuanSchema>;
