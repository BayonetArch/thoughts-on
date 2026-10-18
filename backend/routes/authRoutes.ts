import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController";
import validateBody from "../middleware/validateBody";
import userSchema from "../schemas/userSchema";

const authRouter = Router();

/* GET /api/auth/me */
authRouter.get("/me", getCurrentUser);

/* POST /api/auth/register */
authRouter.post(
  "/register",
  validateBody(userSchema, "could not validate body for user registration"),
  registerUser,
);

/* POST /api/auth/login */
authRouter.post(
  "/login",
  validateBody(userSchema, "could not validate user for login."),
  loginUser,
);

/* POST /api/auth/logout */
authRouter.post("/logout", logoutUser);

export default authRouter;
