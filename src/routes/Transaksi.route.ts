import express from "express";
import { cancelDetailTransaksi } from "../controllers/Detail.transaksi.controller";
import {
	deleteTransaksi,
	detailTransaksi,
	getAllTransaksi,
	postTransaksi,
} from "../controllers/Transaksi.controller";
import { SchemaValidator } from "../middleware/SchemaValidator.middleware";
import {
	createMainTransaksiSchema,
	deleteMasterTransaksiSchema,
	detailTransaksiSchema,
} from "../schema/master_transaksi.schema";
const router = express.Router();

router.get("/", getAllTransaksi);
router.post("/", SchemaValidator(createMainTransaksiSchema), postTransaksi);
router.delete(
	"/:_id_master_transaksi",
	SchemaValidator(deleteMasterTransaksiSchema),
	deleteTransaksi
);
router.get(
	"/detail-transaksi/:_id_master_transaksi",
	SchemaValidator(detailTransaksiSchema),
	detailTransaksi
);

router.delete("/detail-transaksi/detail/:_id", cancelDetailTransaksi);

export default router;
