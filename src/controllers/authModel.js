import User from "../models/auth/authSchema.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    // get the user details from the input userName.

    if (!user) return next(createError(404, "User not found"));
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch)
      return next(createError(400, "Wrong password or userName"));
    // we store the user information in jsonwebtoken to later verify along wit the secret key to be verified whenever we need the admin verification
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    // destructure the returned userObject and do not send the sensitive information
    const { isAdmin, password, ...rest } = user._doc;
    // we also send the token as a cookie to in the frontend
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...rest });
  } catch (err) {
    next(err);
  }
};
