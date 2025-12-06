import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../helpers/sendEmail.js";
import User from "../db/models/User.js";
import { verificationEmailTemplate } from "../helpers/emailTemplates.js";

const { JWT_SECRET, BASE_URL } = process.env;

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


  try {
    const htmlContent = verificationEmailTemplate(
      verificationToken,
      BASE_URL || "http://localhost:3000"
    );

    await sendEmail(
      email,
      "Підтвердження реєстрації", // Тема листа
      htmlContent // HTML контент
    );

    console.log(`Verification email sent to ${email}`);
  } catch (emailError) {
    console.error("Failed to send verification email:", emailError);
    // Користувач створений, але email не відправлено
    // Можна додати логіку для повторної відправки пізніше
  }

  return {
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
    message: "User registered. Please check your email for verification link.",
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

  // Перевіряємо, чи email верифіковано
  if (!user.verify) {
    return { error: "Email not verified. Please check your email.", status: 401 };
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

export const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return { error: "User not found", status: 404 };
  }

  if (user.verify) {
    return { error: "Email already verified", status: 400 };
  }

  // Генеруємо новий токен
  const verificationToken = crypto.randomUUID();
  await user.update({ verificationToken });

  // Відправляємо email
  try {
    const htmlContent = verificationEmailTemplate(
      verificationToken,
      BASE_URL || "http://localhost:3000"
    );
    await sendEmail(email, "Підтвердження реєстрації", htmlContent);

    console.log(`Verification email resent to ${email}`);

    return {
      message: "Verification email resent successfully",
    };
  } catch (emailError) {
    console.error("Failed to resend verification email:", emailError);
    return {
      error: "Failed to send verification email",
      status: 500,
    };
  }
};
