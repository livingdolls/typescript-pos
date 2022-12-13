import express from "express";
import { Login, Logout, Registrasi } from "../controllers/Auth.controller";
import { SchemaValidator } from "../middleware/SchemaValidator.middleware";
import { RefreshToken } from "../middleware/ValidasiToken.middleware";
import { CreateUserSchema, LoginSchema } from "../schema/Auth.schema";

const router = express.Router();

router.post("/register", SchemaValidator(CreateUserSchema), Registrasi);
router.post("/login", SchemaValidator(LoginSchema), Login);
router.get("/token", RefreshToken);
router.delete("/logout", Logout);

export default router;
