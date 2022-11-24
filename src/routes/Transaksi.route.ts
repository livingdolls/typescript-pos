import express from "express";
import {
	deleteTransaksi,
	getAllTransaksi,
	postTransaksi,
} from "../controllers/Transaksi.controller";
import { SchemaValidator } from "../middleware/SchemaValidator.middleware";
import {
	createMainTransaksiSchema,
	deleteMasterTransaksiSchema,
} from "../schema/master_transaksi.schema";
const router = express.Router();

router.get("/", getAllTransaksi);
router.post("/", SchemaValidator(createMainTransaksiSchema), postTransaksi);
router.delete(
	"/:_id_master_transaksi",
	SchemaValidator(deleteMasterTransaksiSchema),
	deleteTransaksi
);

export default router;
