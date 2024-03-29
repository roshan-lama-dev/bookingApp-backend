import express from "express";
import { createUser, loginUser } from "../controllers/authModel.js";

const router = express.Router();

// router.send("Heelo from the auth endPoint");
router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
