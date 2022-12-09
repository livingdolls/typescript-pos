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

export const CreateUserSchema = object({
	...payloadBody,
});

export const LoginSchema = object({
	body: object({
		email: string({
			required_error: "Email harus di isi!",
			invalid_type_error: "Masukkan huruf",
		}).email(),
		password: string({
			required_error: "Password harus di isi!",
			invalid_type_error: "Masukkan huruf dan angka",
		}).min(6, "Password harus lebih dari 6 karakter"),
	}),
});

export type CreateUserType = TypeOf<typeof CreateUserSchema>;
export type LoginUserType = TypeOf<typeof LoginSchema>;
