import { never, object, string, TypeOf } from "zod";

const payloadBody = {
	body: object({
		nama: string({
			required_error: "Nama harus di isi!",
			invalid_type_error: "Masukkan huruf",
		}).min(3, "Nama harus lebih dari 3 karakter"),
		email: string({
			required_error: "Email harus di isi!",
			invalid_type_error: "Masukkan huruf",
		}).email(),
		password: string({
			required_error: "Password harus di isi!",
			invalid_type_error: "Masukkan huruf dan angka",
		}).min(6, "Password harus lebih dari 6 karakter"),
	}),
};

const payloadParams = {
	params: object({
		_id_user: string({
			required_error: "Params kosong!",
		}),
	}),
};

export const getOneUserSchema = object({
	...payloadParams,
});

export const deleteUserSchema = object({
	...payloadParams,
});

export const updateUserSchema = object({
	...payloadBody,
	...payloadParams,
});

export type getOneUserType = TypeOf<typeof getOneUserSchema>;
export type deleteUserType = TypeOf<typeof deleteUserSchema>;
export type updateUserType = TypeOf<typeof updateUserSchema>;
