import { Router } from "express";
import { validateData } from "../../middlewares/validation.middleware";
import { createUserSchema, loginSchema } from "../users/users.schema";
import { loginUser, registerUser } from "./auth.controller";

const router = Router();

router.post("/register", validateData(createUserSchema), registerUser);
router.post("/login", validateData(loginSchema), loginUser);

export default router;
