import express from "express";
import { register, login, logout, getMe } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin } from "../middlewares/userValidation.middleware.js";
import { authenticate } from "../middlewares/authenticate.middleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.get("/me", authenticate, getMe);

export default router;
