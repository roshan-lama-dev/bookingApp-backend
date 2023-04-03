import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,
} from "../controllers/roomModel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE

router.put("/:id", verifyAdmin, updateRoom);
// DELETE
// only admin is able to delete the Room information
// the admin details will be checked using the JWT
router.delete("/:id", verifyAdmin, deleteRoom);
// GET
router.get("/:id", getRoom);
// GET ALL
router.get("/", getAllRoom);

export default router;
