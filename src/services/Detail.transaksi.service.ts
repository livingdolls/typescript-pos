import conn from "../config/db";
import {
	cancelDetailTransaksiType,
	detail_transaksi,
} from "../schema/Detail_Transaksi..schema";
import { detailTransaksiType } from "../schema/master_transaksi.schema";

export const cancelDetailTransaksiService = async (
	_id: cancelDetailTransaksiType
) => {
	try {
		const findDetail = await findDetailTransaksiService(_id);
		if (typeof findDetail === "undefined") {
			return { status: 404, msg: "not found!" };
		}

		const cancel_transaksi: any = await conn.query(
			`DELETE FROM detail_transaksi WHERE ?`,
			[_id]
		);

		if (cancel_transaksi[0].affectedRows === 0) {
			return { msg: "something wrong!" };
		}

		// // update barang
		const _id_barang = { _id_barang: findDetail._id_barang };
		const findBarang: any = await conn.query(
			`SELECT * FROM barang WHERE ?`,
			[_id_barang]
		);

		const barang = findBarang[0][0];

		if (typeof barang === "undefined") {
			return { status: 404, msg: "not found!" };
		}

		const new_qty = { qty: barang.qty + findDetail.qty };
		await conn.query(`UPDATE barang set ? WHERE ?`, [new_qty, _id_barang]);

		return { status: 201, msg: "cancel transaksi success!" };
	} catch (error: any) {
		throw new Error(error);
	}
};

export const findDetailTransaksiService = async (
	_id: cancelDetailTransaksiType
) => {
	try {
		const detail: any = await conn.query(
			`SELECT * FROM detail_transaksi WHERE ?`,
			[_id]
		);
		return detail[0][0];
	} catch (error: any) {
		throw new Error(error);
	}
};

export const cancelTransaksiService = async (_id: detailTransaksiType) => {
	try {
		const id = { _id: _id._id_master_transaksi };
		const cancelTransaksi: any = await conn.query(
			`DELETE FROM master_transaksi WHERE ?`,
			[id]
		);

		if (cancelTransaksi[0].affectedRows === 0) {
			return { msg: "something wrong!", status: 500 };
		}

		const detail: any = await conn.query(
			`SELECT * FROM detail_transaksi WHERE ?`,
			[_id]
		);

		detail[0].forEach(async (e: detail_transaksi) => {
			// update barang
			const id_barang = { _id_barang: e._id_barang };
			const barang: any = await conn.query(
				`SELECT * FROM barang WHERE ?`,
				[id_barang]
			);
			const res_barang = barang[0][0];
			const new_qty = res_barang.qty + e.qty;
			const patch_barang = { qty: new_qty };
			await conn.query(`UPDATE barang SET ? WHERE ?`, [
				patch_barang,
				id_barang,
			]);
		});

		// Delete detail transaksi
		await conn.query(`DELETE FROM detail_transaksi WHERE ?`, [_id]);

		return { msg: "success cancel transaksi", status: 200 };
	} catch (error: any) {
		throw new Error(error);
	}
};
