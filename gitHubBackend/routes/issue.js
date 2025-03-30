import express from "express";
import issueController from "../controllers/issue.js";

const issueRouter = express.Router();

issueRouter.post("/create/:repoId", issueController.createIssue);
issueRouter.put("/update/:id", issueController.updateIssueById);
issueRouter.delete("/delete/:id", issueController.deleteIssueById);
issueRouter.get("/all/:repoId", issueController.getAllIssue);
issueRouter.get("/:id", issueController.getIssueById);


export default issueRouter;