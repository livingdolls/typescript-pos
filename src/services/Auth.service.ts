import conn from "../config/db";
import { CreateUserType } from "../schema/Auth.schema";
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
