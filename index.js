import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import contactsRouter from "./routes/contactsRouter.js";
import { connectDB } from "./db/sequelize.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);


app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;

// Підключення до БД і запуск сервера
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();