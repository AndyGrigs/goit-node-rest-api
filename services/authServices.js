import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import User from "../db/models/User.js";

const { JWT_SECRET } = process.env;

export const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return { error: "Email using", status: 409 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: 250 });

  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription: "starter",
    avatarURL,
  });

  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
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
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "24h",
  });

  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  };
};

export const logoutUser = async (userId) => {
  // 1. Шукаємо користувача за id (id ми отримаємо з req.user)
  const user = await User.findByPk(userId);

  if (!user) {
    return { error: "Not authorized", status: 401 };
  }

  // 2. Видаляємо токен - встановлюємо null
  await user.update({ token: null });

  // 3. Повертаємо успіх
  return { success: true };
};
