// Manage routes/paths to ProductController

// 1.Import Express.
import express from "express";
import jwtAuth from "../../middlewares/jwt.middleware.js"
import UserController from "../user/controllers/user.controller.js";

// 2.Initialize Express router
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods
userRouter.get("/", userController.getAllUser);
// userRouter.post('/signin', userController.signUp);
userRouter.post("/signup", (req, res, next) => {
  userController.signUp(req, res, next);
});
// userRouter.post("/signin", userController.signIn);
userRouter.post("/signin", (req, res, next) => {
  userController.signIn(req, res, next);
});

userRouter.put("/resetPassword", jwtAuth ,(req, res, next) => {
  userController.resetPassword(req, res, next);
});

export default userRouter;
