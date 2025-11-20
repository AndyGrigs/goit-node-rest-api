import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/models/User.js";

const { JWT_SECRET } = process.env;

export const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return { error: "Email using", status: 409 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription: "starter",
  });

  return {
    user: {
        email: newUser.email,
        subscription: newUser.subscription,
    },
  };
};


export const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { error: "Email or password is wrong", status: 401 };
  }
  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return { error: "Email or password is wrong", status: 401 };
  }
  const token = jwt.sign(
    {id: user.id, email: user.email},
    JWT_SECRET,
    {expiresIn: "24h"}
  );

  return {
    token,
    user: {
        email: newUser.email,
        subscription: newUser.subscription,
    },
  };
};
