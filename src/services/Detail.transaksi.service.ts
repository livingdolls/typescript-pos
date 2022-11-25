import conn from "../config/db";
import { cancelDetailTransaksiType } from "../schema/Detail_Transaksi..schema";

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
