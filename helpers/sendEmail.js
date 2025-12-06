import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Конфігурація для ukr.net
const config = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true, // true для порту 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

// Створюємо транспортер
const transporter = nodemailer.createTransport(config);

/**
 * Функція для відправки email
 * @param {string} to - Email отримувача
 * @param {string} subject - Тема листа
 * @param {string} html - HTML контент листа
 */
const sendEmail = async (to, subject, html) => {
  try {
    // Налаштування email
    const emailOptions = {
      from: process.env.EMAIL_USER, // Від кого
      to, // Кому
      subject, // Тема
      html, // HTML контент
    };

    // Відправляємо email
    const info = await transporter.sendMail(emailOptions);

    console.log("Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
