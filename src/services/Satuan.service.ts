import {
	createSatuanType,
	deleteSatuanType,
	readSatuanType,
	updateSatuanType,
} from "../schema/Satuan.schema";
import { v4 as uuid } from "uuid";
import conn from "../config/db";

export const createSatuanService = async (params: createSatuanType["body"]) => {
	try {
		const data = { _id_satuan: uuid(), ...params };
		return await conn.query(`INSERT INTO satuan SET ? `, [data]);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const readSatuanService = async () => {
	try {
		const data = await conn.query(`SELECT * FROM satuan`);
		return data[0];
	} catch (error: any) {
		throw new Error(error);
	}
};

export const findSatuanService = async (params: readSatuanType["params"]) => {
	try {
		const find = await conn.query(`SELECT * FROM satuan WHERE ?`, [params]);

		return find[0];
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateSatuanService = async (
	params: updateSatuanType["params"],
	body: updateSatuanType["body"]
) => {
	try {
		return await conn.query(`UPDATE satuan SET ? WHERE ?`, [body, params]);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteSatuanService = async (
	params: deleteSatuanType["params"]
) => {
	try {
		return await conn.query(`DELETE FROM satuan WHERE ?`, [params]);
	} catch (error: any) {
		throw new Error(error);
	}
};
