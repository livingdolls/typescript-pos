import {
	createBarangType,
	deleteBarangType,
	readBarangType,
	updateBarangType,
} from "../schema/Barang.schema";
import { v4 as uuid } from "uuid";
import conn from "../config/db";

export const allBarangService = async () => {
	try {
		const data = await conn.query(
			`SELECT _id_barang,b.nama,harga,qty,s.nama as _id_satuan,k.nama as _id_kategori FROM barang as b JOIN kategori as k ON b._id_kategori = k._id_kategori JOIN satuan as s on b._id_satuan = s._id_satuan`
		);

		return data[0];
	} catch (error: any) {
		throw new Error(error);
	}
};

export const allBarangServiceReal = async (
	params: readBarangType["params"]
) => {
	try {
		const data = await conn.query(`SELECT * FROM barang WHERE ?`, [params]);

		return data[0];
	} catch (error: any) {
		throw new Error(error);
	}
};

export const createBarangService = async (params: createBarangType["body"]) => {
	try {
		const data = { _id_barang: uuid(), ...params };
		console.log(data);

		return conn.query(`INSERT INTO barang SET ?`, [data]);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const findBarangService = async (params: readBarangType["params"]) => {
	try {
		const data = await conn.query(`SELECT * FROM barang WHERE ?`, [params]);

		return data[0];
	} catch (error: any) {
		throw new Error(error);
	}
};

export const updateBarangService = async (
	params: updateBarangType["params"],
	body: updateBarangType["body"]
) => {
	try {
		return await conn.query(`UPDATE barang SET ? WHERE ?`, [body, params]);
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteBarangService = async (
	params: deleteBarangType["params"]
) => {
	try {
		return await conn.query(`DELETE FROM barang WHERE ?`, [params]);
	} catch (error: any) {
		throw new Error(error);
	}
};
