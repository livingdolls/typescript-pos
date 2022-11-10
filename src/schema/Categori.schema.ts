import { object, string, TypeOf } from "zod";

export const CreateCategoriSchema = object({
	body: object({
		nama: string({
			required_error: "Nama harus di isi!",
			invalid_type_error: "Masukkan huruf",
		}),
		keterangan: string({
			required_error: "Keterangan harus di isi!",
			invalid_type_error: "Masukkan huruf",
		}),
	}),
});

export const UpdateCategoriSchema = object({
	body: object({
		nama: string({
			required_error: "Nama harus di isi!",
			invalid_type_error: "Masukkan huruf",
		}),
		keterangan: string({
			required_error: "Keterangan harus di isi!",
			invalid_type_error: "Masukkan huruf",
		}),
	}),
	params: object({
		_id_kategori: string().min(5),
	}),
});

export const FindCategoriSchema = object({
	params: object({
		_id_kategori: string().min(5),
	}),
});

export const DeleteCategoriSchema = object({
	params: object({
		_id_kategori: string().min(5),
	}),
});

export type CreateCategoriType = TypeOf<typeof CreateCategoriSchema>["body"];
export type UpdateCategoriType = TypeOf<typeof UpdateCategoriSchema>;
export type FindCategoriType = TypeOf<typeof FindCategoriSchema>["params"];
export type DeleteCategoriType = TypeOf<typeof DeleteCategoriSchema>["params"];
