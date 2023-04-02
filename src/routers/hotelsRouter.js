import express from "express";
import Hotel from "../models/hotels/HotelSchema.js";
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },

      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});
// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET
router.get("/:id", async (req, res) => {
  try {
    const singleHotel = await Hotel.findById(req.params.id);
    res.status(200).json(singleHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});
// GET ALL
router.get("/", async (req, res) => {
  try {
    const allHotel = await Hotel.find();
    res.status(200).json(allHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
