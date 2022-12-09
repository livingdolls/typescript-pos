import express from "express";
import {
	CreateBarang,
	deleteBarang,
	findBarang,
	getAllBarang,
	getBarangReal,
	updateBarang,
} from "../controllers/Barang.controller";
import { SchemaValidator } from "../middleware/SchemaValidator.middleware";
import { VerifyToken } from "../middleware/ValidasiToken.middleware";
import {
	createBarangSchema,
	deleteBarangSchema,
	readBarangSchema,
	updateBarangSchema,
} from "../schema/Barang.schema";
const router = express.Router();

router.get("/", getAllBarang);
router.get("/barang/:_id_barang", VerifyToken, getBarangReal);
router.post(
	"/",
	VerifyToken,
	SchemaValidator(createBarangSchema),
	CreateBarang
);
router.get(
	"/:_id_barang",
	VerifyToken,
	SchemaValidator(readBarangSchema),
	findBarang
);
router.put("/:_id_barang", SchemaValidator(updateBarangSchema), updateBarang);
router.delete(
	"/:_id_barang",
	SchemaValidator(deleteBarangSchema),
	deleteBarang
);

export default router;
