import User from "../models/auth/authSchema.js";
import bcrypt from "bcryptjs";
export const createUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password);
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
