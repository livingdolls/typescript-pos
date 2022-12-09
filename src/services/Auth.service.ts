import conn from "../config/db";
import { CreateUserType, LoginUserType } from "../schema/Auth.schema";
import { v4 as uuid } from "uuid";
import { CreateError } from "../utils/CreateError";
import { response } from "../utils/CustomResponse";

export const CreateUser = async (input: CreateUserType["body"]) => {
	const { nama, email, password } = input;
	const data = { _id_user: uuid(), nama, email, password };

	try {
		return await conn.query(`INSERT INTO user SET ?`, [data]);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const FindUser = async (email: LoginUserType["body"]) => {
	try {
		const data = { email: email.email };
		const [row] = await conn.query(`SELECT * FROM user WHERE ?`, data);
		return row;
	} catch (error: any) {
		throw new Error(error);
	}
};
type refresh = {
	_id_user: string;
	refresh_token: string;
};
export const RefreshToken = async (params: refresh) => {
	try {
		const refresh = await conn.query(
			`UPDATE user SET refresh_token = ? WHERE _id_user = ?`,
			[params.refresh_token, params._id_user]
		);
		return refresh;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getRefreshToken = async (params: string) => {
	try {
		const [row] = await conn.query(
			`SELECT * FROM user WHERE refresh_token = ?`,
			[params]
		);
		return row;
	} catch (error: any) {
		throw new Error(error);
	}
};
