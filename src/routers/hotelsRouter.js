import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updateHotel,
} from "../controllers/hotelModel.js";

import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE

router.put("/:id", verifyAdmin, updateHotel);
// DELETE
// only admin is able to delete the hotel information
// the admin details will be checked using the JWT
router.delete("/:id", verifyAdmin, deleteHotel);
// GET
router.get("/:id", getHotel);
// GET ALL
router.get("/", getAllHotel);

export default router;
