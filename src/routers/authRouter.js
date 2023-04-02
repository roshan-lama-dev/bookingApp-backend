import express from "express";

const router = express.Router();

// router.send("Heelo from the auth endPoint");
router.get("/", (req, res) => {
  res.send("Hello");
});

export default router;
