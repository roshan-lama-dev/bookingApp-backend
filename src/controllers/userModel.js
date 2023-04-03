import user from "../models/auth/authSchema.js";

export const updateuser = async (req, res, next) => {
  try {
    const updateuser = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },

      { new: true }
    );
    res.status(200).json(updateuser);
  } catch (error) {
    next(error);
  }
};
export const deleteuser = async (req, res, next) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been Deleted");
  } catch (error) {
    next(error);
  }
};
export const getuser = async (req, res, next) => {
  try {
    const singleuser = await user.findById(req.params.id);
    res.status(200).json(singleuser);
  } catch (error) {
    next(error);
  }
};
export const getAlluser = async (req, res, next) => {
  try {
    const alluser = await user.find();
    res.status(200).json(alluser);
  } catch (error) {
    next(error);
  }
};
