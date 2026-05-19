import { Router } from "express";
import bcrypt from "bcrypt"
import { User } from "../models/User.js";
import { handleRegister } from "../controllers/auth/handleRegister.js";
import { handleLogin } from "../controllers/auth/handleLogin.js";

const authRoute = new Router()

authRoute.post("/register", handleRegister);

authRoute.post("/login", handleLogin);

export default authRoute;