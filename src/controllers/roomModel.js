import Room from "../models/rooms/roomSchema.js";
import Hotel from "../models/hotels/HotelSchema.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(
        hotelId,
        {
          $push: { rooms: savedRoom._id },
        },
        { new: true }
      );
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};
export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },

      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};
export const deleteRoom = async (req, res, next) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been Deleted");
  } catch (error) {
    next(error);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const singleRoom = await Room.findById(req.params.id);
    res.status(200).json(singleRoom);
  } catch (error) {
    next(error);
  }
};
export const getAllRoom = async (req, res, next) => {
  try {
    const allRoom = await Room.find();
    res.status(200).json(allRoom);
  } catch (error) {
    next(error);
  }
};
