import jwt from "jsonwebtoken";

import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  // first we get the cookies from the request put in
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  //   then we verify if the token is valid against the secret key, then the err parameter returns error if the token doesnot match and the user parameter holds the user information which was put into the token during the login process
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "token is not valid"));
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    console.log(req.user);
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorised"))();
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    console.log(req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorised"))();
    }
  });
};
