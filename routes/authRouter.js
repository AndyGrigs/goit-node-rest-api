import express from "express";
import * as authControllers from "../controllers/authController.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerSchema),
  authControllers.register
);

authRouter.post("/login", validateBody(loginSchema), authControllers.login);
authRouter.post("/logout", authenticate, authControllers.logout);
authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.get("/verify/:verificationToken", authControllers.verifyEmail);

export default authRouter;
