import Hotel from "../models/hotels/HotelSchema.js";
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};
export const updateHotel = async (req, res, next) => {
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
    next(error);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been Deleted");
  } catch (error) {
    next(error);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const singleHotel = await Hotel.findById(req.params.id);
    res.status(200).json(singleHotel);
  } catch (error) {
    next(error);
  }
};
export const getAllHotel = async (req, res, next) => {
  try {
    const allHotel = await Hotel.find();
    res.status(200).json(allHotel);
  } catch (error) {
    next(error);
  }
};
