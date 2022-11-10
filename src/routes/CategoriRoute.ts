import express from "express";
import {
	addCategori,
	deleteCategori,
	findOneCategori,
	getAllCategori,
	updateCategori,
} from "../controllers/CategoriController";
import { SchemaValidator } from "../middleware/SchemaValidator.middleware";
import {
	CreateCategoriSchema,
	DeleteCategoriSchema,
	FindCategoriSchema,
	UpdateCategoriSchema,
} from "../schema/Categori.schema";

const router = express.Router();

router.get("/", getAllCategori);
router.get(
	"/:_id_kategori",
	SchemaValidator(FindCategoriSchema),
	findOneCategori
);
router.post("/", SchemaValidator(CreateCategoriSchema), addCategori);
router.put(
	"/:_id_kategori",
	SchemaValidator(UpdateCategoriSchema),
	updateCategori
);

router.delete(
	"/:_id_kategori",
	SchemaValidator(DeleteCategoriSchema),
	deleteCategori
);

export default router;
