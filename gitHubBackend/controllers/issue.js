import mongoose from "mongoose";

import Repository from '../models/Repository.model.js';
import User from '../models/User.model.js';
import Issue from '../models/Issue.model.js';

const createIssue = async (req, res) => {
  try{
    const {title, description} = req.body;
    const {repoId} = req.params;
    const issue = new Issue({title, description, repository: repoId });
    await issue.save();
    return res.status(201).json(issue);
  }catch(err){
    console.log("Error during createIssue : " , err);
    return res.status(500).send("Server error");
  }
};

const updateIssueById = async (req, res) => {
  try{
    const {id} = req.params;
    const {title, description, status} = req.body;
    const issue = await Issue.findById(id);
    if(!issue) return res.status(404).json({error: "Issue not found"});
    issue.title = title;
    issue.description = description;
    issue.status = status;
    await issue.save();

    return res.status(200).json(issue);

  }catch(err){
    console.log("Error during updateIssueById : " , err);
    return res.status(500).send("Server error");
  }
};

const deleteIssueById = async (req, res) => {
  try{
    const {id} = req.params;
    const issue = await Issue.findByIdAndDelete(id);
    if(!issue) return res.status(404).json({error: "Issue not found"});
    return res.status(200).json({message: "Issue deleted successfully"});
  }catch(err){
    console.log("Error during deleteIssueById : " , err);
    return res.status(500).send("Server error");
  }
};

const getAllIssue = async (req, res) => {
  try{
    const {repoId} = req.params;
    const issues = await Issue.find({repository: repoId});
    if(!issues) return res.status(404).json({error: "No issues found for this repository"});
    return res.status(200).json(issues);
  }catch(err){
    console.log("Error during getAllIssue : " , err);
    return res.status(500).send("Server error");
  }
};

const getIssueById = async (req, res) => {
  try{
    const {id} = req.params;
    const issue = await Issue.findById(id);
    if(!issue) return res.status(404).json({error: "Issue not found"});
    return res.status(200).json(issue);
  }catch(err){
    console.log("Error during getIssueById : " , err);
    return res.status(500).send("Server error");
  }
};

export default {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssue,
  getIssueById,
};