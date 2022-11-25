import { detail_transaksi } from "../schema/Detail_Transaksi..schema";

export const CountTransaksi = (
	data: Omit<detail_transaksi[], "_id" | "_id_barang">
): number => {
	let total = 0;

	data.forEach((e) => {
		let sub_total = e.harga * e.qty;
		total += sub_total;
	});

	return total;
};
