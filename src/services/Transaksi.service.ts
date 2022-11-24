import conn from "../config/db";
import { v4 as uuid } from "uuid";
import {
	createMainTransaksiType,
	deleteMasterTransaksiType,
} from "../schema/master_transaksi.schema";

export const getTransaksiService = async () => {
	try {
		const [rows] = await conn.query(`SELECT * FROM master_transaksi`);

		return rows;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const findTransaksiService = async (_id: deleteMasterTransaksiType) => {
	try {
		const [rows] = await conn.query(
			`SELECT * FROM master_transaksi WHERE ?`,
			[_id]
		);

		return rows;
	} catch (error: any) {
		throw new Error(error);
	}
};

type detail_transaksi = {
	_id: number;
	_id_barang: string;
	harga: number;
	qty: number;
	sub_total: number;
};

export const postTransaksiService = async (data: createMainTransaksiType) => {
	try {
		const { _id_admin, invoice, sub_total, diskon, total } = data;
		const transaksi = {
			_id_master_transaksi: uuid(),
			_id_admin,
			invoice,
			sub_total,
			diskon,
			total,
		};
		const tr = data.detail_transaksi;

		const post_transaksi: any = await conn.query(
			`INSERT INTO master_transaksi SET ?`,
			[transaksi]
		);

		if (post_transaksi[0].affectedRows === 1) {
			tr.forEach(async (e: detail_transaksi) => {
				const sub_total = e.harga * e.qty;
				const _id_master_transaksi = post_transaksi[0].insertId;
				const detail = { ...e, _id_master_transaksi, sub_total };

				await conn.query(`INSERT INTO detail_transaksi SET ?`, [
					detail,
				]);
			});
		} else {
			return { msg: "failed transaksi" };
		}

		return { msg: "created transaksi!" };
	} catch (error: any) {
		throw new Error(error);
	}
};

export const deleteTransaksiService = async (
	_id: deleteMasterTransaksiType
) => {
	try {
		const del = await conn.query(`DELETE FROM master_transaksi WHERE ?`, [
			_id,
		]);

		return del;
	} catch (error: any) {
		throw new Error(error);
	}
};
