import express from "express";
import userController from "../controllers/user.js";

const userRouter = express.Router();

userRouter.get("/allUsers", userController.getAllUsers);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/getUser/:id", userController.getUser);
userRouter.put("/updateUser/:id", userController.updateUser);
userRouter.delete("/deleteUser/:id", userController.deleteUser);

export default userRouter;

