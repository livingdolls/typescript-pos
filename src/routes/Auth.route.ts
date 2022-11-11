import express from "express";
import { Registrasi } from "../controllers/Auth.controller";
import { SchemaValidator } from "../middleware/SchemaValidator.middleware";
import { CreateUserSchema } from "../schema/Auth.schema";

const router = express.Router();

router.post("/", SchemaValidator(CreateUserSchema), Registrasi);

export default router;
