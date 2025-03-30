import express from "express";;

const mainRouter = express.Router();

import userRouter from "./user.js";
import repositoryRouter from "./repository.js";
import issueRouter from "./issue.js";

mainRouter.use(userRouter);
mainRouter.use("/repo", repositoryRouter);
mainRouter.use("/issue", issueRouter);

mainRouter.get("/", (req, res) => {
  res.send("Welcome to GitHub Backend");
});


export default mainRouter;