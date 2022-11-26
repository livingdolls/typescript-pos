import conn from "../config/db";
import { v4 as uuid } from "uuid";
import {
	createMainTransaksiType,
	deleteMasterTransaksiType,
	detailTransaksiType,
} from "../schema/master_transaksi.schema";
import { detail_transaksi } from "../schema/Detail_Transaksi..schema";
import { findBarangService } from "./Barang.service";

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
				const _id_master_transaksi = post_transaksi[0].insertId;
				const detail = { ...e, _id_master_transaksi };

				// Update Barang
				const data_barang: any = await findBarangService({
					_id_barang: e._id_barang,
				});
				const new_qty_barang = data_barang[0].qty - e.qty;
				const _id_barang = data_barang[0]._id_barang;
				await conn.query(
					`UPDATE barang SET qty = ? WHERE _id_barang = ?`,
					[new_qty_barang, _id_barang]
				);
				// End Update Barang

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

export const detailTransaksiService = async (_id: detailTransaksiType) => {
	try {
		const [row] = await conn.query(
			`SELECT * FROM detail_transaksi WHERE ?`,
			[_id]
		);

		return row;
	} catch (error: any) {
		throw new Error(error);
	}
};
