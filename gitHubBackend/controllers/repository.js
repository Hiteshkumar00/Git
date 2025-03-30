import mongoose from "mongoose";

import Repository from '../models/Repository.model.js';
import User from '../models/User.model.js';
import Issue from '../models/Issue.model.js';


const createRepository = async (req, res) => {
  try{
    const {name, description, owner, content, visibility} = req.body;
    if(!name) return res.status(400).json({error : "Repository name is required!"});
    if(!mongoose.Types.ObjectId.isValid(owner)) return res.status(400).json({error : "Owner is required!"});
    
    const newRepository = new Repository({name, description, owner, content, visibility});
    const savedRepository = await newRepository.save();

    return res.status(201).json({
      message: "Repository created successfully", 
      repositoryId: savedRepository._id
    });

  }catch(err){
    console.log("Error during createRepository : " , err);
    return res.status(500).send("Server error");
  }
};

const getAllRepositories = async (req, res) => {
  try{
    const repositories = await Repository.find({}).populate("owner").populate("issues");
    return res.status(200).json(repositories);
  }catch(err){
    console.log("Error during getAllRepositories : " , err);
    return res.status(500).send("Server error");
  }
};

const getRepositoryById = async (req, res) => {
  try{
    const {id} = req.params;
    const repository = await Repository.findById(id).populate("owner").populate("issues");
    if(!repository) return res.status(404).json({error : "Repository not found!"});
    return res.status(200).json(repository);
  }catch(err){
    console.log("Error during getRepositoryById : " , err);
    return res.status(500).send("Server error");
  }
};

const getRepositoriesByUser = async (req, res) => {
  try{
    const {user} = req.params;
    const repositories = await Repository.find({owner: user}).populate("owner").populate("issues");
    if(!repositories) return res.status(404).json({error : "No repositories found for this user!"});
    return res.status(200).json(repositories);
  }catch(err){
    console.log("Error during getRepositoriesByUser : " , err);
    return res.status(500).send("Server error");
  }
};

const updateRepositoryById = async (req, res) => {
  try{
    const {id} = req.params;
    const {content, description} = req.body;

    const repository = await Repository.findById(id);
    if(!repository) return res.status(404).json({error : "Repository not found!"});

    repository.content.push(content);
    repository.description = description;
    const updatedRepository = await repository.save();
    
    return res.status(200).json({message: "Repository updated successfully", repository: updatedRepository});
  }catch(err){
    console.log("Error during updateRepositoryById : " , err);
    return res.status(500).send("Server error");
  }
};

const toggleVisibilityById = async (req, res) => {
  try{
    const {id} = req.params;

    const repository = await Repository.findById(id);
    if(!repository) return res.status(404).json({error : "Repository not found!"});

    repository.visibility = !repository.visibility;
    const updatedRepository = await repository.save();
    
    return res.status(200).json({message: "Repository visibility toggled successfully", repository: updatedRepository});
  }catch(err){
    console.log("Error during toggleVisibilityById : " , err);
    return res.status(500).send("Server error");
  }
};

const deleteRepositoryById = async (req, res) => {
  try{
    const {id} = req.params;
    const repository = await Repository.findByIdAndDelete(id);
    if(!repository) return res.status(404).json({error : "Repository not found!"});
    return res.status(200).json({message: "Repository deleted successfully"});
  }catch(err){
    console.log("Error during deleteRepositoryById : " , err);
    return res.status(500).send("Server error");
  }
};

export default { createRepository, getAllRepositories, getRepositoryById, getRepositoriesByUser, updateRepositoryById, toggleVisibilityById, deleteRepositoryById };