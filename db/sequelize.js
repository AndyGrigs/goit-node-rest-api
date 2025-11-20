import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Для Render.com потрібно
    },
  },
  logging: false, // Вимкнути логування SQL запитів (можна встановити console.log дляDebugMode)
});



// Перевірка підключення
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
    
    // Синхронізація моделей з базою даних
    await sequelize.sync({ alter: false }); // alter: true - оновлює таблиці, false - не змінює
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default sequelize;