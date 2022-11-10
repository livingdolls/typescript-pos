import {
	CreateCategoriType,
	DeleteCategoriType,
	FindCategoriType,
	UpdateCategoriType,
} from "../schema/Categori.schema";
import { v4 as uuid } from "uuid";
import { CreateError } from "../utils/CreateError";
import conn from "../config/db";

export const CreateCategori = async (input: CreateCategoriType) => {
	const { nama, keterangan } = input;
	const data = { _id_kategori: uuid(), nama, keterangan };
	try {
		return await conn.query(`INSERT INTO kategori SET ?`, [data]);
	} catch (error) {
		CreateError(500, error);
	}
};

export const getAllCategoris = async () => {
	try {
		const data = await conn.query(`SELECT * FROM kategori`);
		return data[0];
	} catch (error) {
		CreateError(500, error);
	}
};

export const UpdateCategori = async (
	params: UpdateCategoriType["params"],
	body: UpdateCategoriType["body"]
) => {
	try {
		const updated = await conn.query(`UPDATE kategori SET ? WHERE ?`, [
			body,
			params,
		]);
		return updated;
	} catch (error) {
		CreateError(500, error);
	}
};

export const findCategori = async (params: FindCategoriType) => {
	try {
		const res = await conn.query(`SELECT * FROM kategori WHERE ?`, [
			params,
		]);

		return res[0];
	} catch (error) {
		CreateError(500, error);
	}
};

export const delCategori = async (params: DeleteCategoriType) => {
	try {
		const del = await conn.query(`DELETE FROM kategori WHERE ?`, [params]);

		console.log(del[0]);
	} catch (error) {
		CreateError(500, error);
	}
};
