import jwt from "jsonwebtoken";
import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authoristion;
    if (!authHeader) {
      throw HttpError(401, "Not authorised");
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw HttpError(401, "Not athorised");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error(error);
      throw HttpError(401, "Not athorised");
    }

    const user = await User.findByPk(decoded.id);

    if (!user || user.token !== token) {
      throw HttpError(401, "Not athorised");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
