import * as authServices from "../services/authServices.js";
import * as avatarServices from "../services/avatarServices.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res, next) =>{
    try {
        const {email, password} = req.body;
        const result = await authServices.registerUser(email, password);
        if(result.error){
            throw HttpError(result.status, result.error);
        }
    res.status(201).json(result);

    } catch (error) {
        next(error)
    }
};

export const login = async (req, res, next) =>{
    try {
        const {email, password} = req.body;
        const result = await authServices.loginUser(email, password);

        if(result.error){
            throw HttpError(result.status, result.error);
        }
    res.status(200).json(result);

    } catch (error) {
        next(error)
    }
};

export const logout = async (req, res, next) => {
    try {
        const { id } = req.user;
        await authServices.logoutUser(id);
        res.json({ message: "Logout successful" });
    } catch (error) {
        next(error);
    }
};

export const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription, avatarURL } = req.user;

    res.status(200).json({
      email,
      subscription,
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "No file provided");
    }

    const { id } = req.user;
    const result = await avatarServices.updateUserAvatar(id, req.file.path);

    if (result.error) {
      throw HttpError(result.status, result.error);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};