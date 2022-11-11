import conn from "../config/db";
import {
	deleteUserType,
	getOneUserType,
	updateUserType,
} from "../schema/User.schema";

export const getAllUser = async () => {
	try {
		const data = await conn.query(`SELECT * FROM user`);

		return data[0];
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getOneUsers = async (params: getOneUserType["params"]) => {
	try {
		const get = await conn.query(`SELECT * FROM user WHERE ?`, [params]);

		return get[0];
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteUserService = async (params: deleteUserType["params"]) => {
	try {
		return await conn.query(`DELETE FROM user WHERE ?`, params);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateUsersService = async (
	params: updateUserType["params"],
	body: updateUserType["body"]
) => {
	try {
		return await conn.query(`UPDATE user SET ? WHERE ?`, [body, params]);
	} catch (error: any) {
		throw new Error(error);
	}
};
