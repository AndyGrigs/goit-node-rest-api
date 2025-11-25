import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET environment variable is required");
  process.exit(1);
}

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

// Define associations after models are loaded
export const defineAssociations = async () => {
  const User = (await import("./models/User.js")).default;
  const Contact = (await import("./models/contacts.js")).default;
  User.hasMany(Contact, { foreignKey: "userId", onDelete: "CASCADE" });
  Contact.belongsTo(User, { foreignKey: "userId" });
};

// Перевірка підключення
export const connectDB = async () => {
  try {
    await defineAssociations();
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