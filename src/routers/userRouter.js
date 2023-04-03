import express from "express";
import {
  deleteuser,
  getAlluser,
  getuser,
  updateuser,
} from "../controllers/userModel.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("User is logged in");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("User isfd logged in");
});
router.get("/checkadmin/:id", verifyUser, (req, res, next) => {
  res.send("You are authorized to do admin stuff");
});

// UPDATE
router.put("/:id", updateuser);
// DELETE
router.delete("/:id", deleteuser);
// GET
router.get("/:id", getuser);
// GET ALLd
router.get("/", getAlluser);
export default router;
