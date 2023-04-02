import express from "express";
import { createUser } from "../controllers/authModel.js";

const router = express.Router();

// router.send("Heelo from the auth endPoint");
router.post("/register", createUser);

export default router;
