import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../db/models/User.js";

const { JWT_SECRET } = process.env;

export const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    return { error: "Email using", status: 409 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomUUID();

  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription: "starter",
    verificationToken,
    verify: false,
  });

  // ⭐ TODO: Тут пізніше додамо відправку email з посиланням
  // Посилання буде виглядати так:
  // http://localhost:3000/api/auth/verify/${verificationToken}

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
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "24h",
  });

  await user.update({ token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
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

export const verifyEmail = async (verificationToken) => {
  // Шукаємо користувача за токеном верифікації
  const user = await User.findOne({ where: { verificationToken } });

  // Якщо користувач не знайдений - повертаємо помилку
  if (!user) {
    return { error: "User not found", status: 404 };
  }

  // Оновлюємо користувача: видаляємо токен і встановлюємо verify = true
  await user.update({
    verify: true,
    verificationToken: null,
  });

  return {
    message: "Verification successful",
  };
};
