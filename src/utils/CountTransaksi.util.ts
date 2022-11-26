import {
	detailTransaksiType,
	detail_transaksi,
} from "../schema/Detail_Transaksi..schema";

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

export const CountTransaksiSubTransaksi = (
	transaksi: detailTransaksiType[]
) => {
	let data: Array<detailTransaksiType> = [];
	transaksi.forEach((e) => {
		let sub_total = e.qty * e.harga;
		let set = { ...e, sub_total };
		data.push(set);
	});

	return data;
};
