import User from "../models/auth/authSchema.js";

export const createUser = async (req, res, next) => {
  try {
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
