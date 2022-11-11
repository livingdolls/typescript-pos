import express from "express";
import {
	deleteUser,
	findUser,
	getAllUsers,
	updateUser,
} from "../controllers/User.controller";
import { SchemaValidator } from "../middleware/SchemaValidator.middleware";
import {
	deleteUserSchema,
	getOneUserSchema,
	updateUserSchema,
} from "../schema/User.schema";
import { getAllUser } from "../services/User.service";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:_id_user", SchemaValidator(getOneUserSchema), findUser);
router.delete("/:_id_user", SchemaValidator(deleteUserSchema), deleteUser);
router.put("/:_id_user", SchemaValidator(updateUserSchema), updateUser);

export default router;
