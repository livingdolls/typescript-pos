import express from "express";
import {
	CreateSatuan,
	deleteSatuan,
	findSatuan,
	readSatuan,
	updateSatuan,
} from "../controllers/Satuan.controller";
import { SchemaValidator } from "../middleware/SchemaValidator.middleware";
import {
	createSatuanSchema,
	deleteSatuanSchema,
	readSatuanSchema,
	updateSatuanSchema,
} from "../schema/Satuan.schema";

const router = express.Router();

router.get("/", readSatuan);
router.post("/", SchemaValidator(createSatuanSchema), CreateSatuan);
router.get("/:_id_satuan", SchemaValidator(readSatuanSchema), findSatuan);
router.put("/:_id_satuan", SchemaValidator(updateSatuanSchema), updateSatuan);
router.delete(
	"/:_id_satuan",
	SchemaValidator(deleteSatuanSchema),
	deleteSatuan
);

export default router;
