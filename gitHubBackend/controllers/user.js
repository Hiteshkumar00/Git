import "dotenv/config";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.model.js";
// import {MongoClient} from "mongodb";

// const MONGO_URL = process.env.MONGO_URL;

// let client;

// async function connectClient(){
//   if(!client){
//     client = new MongoClient(MONGO_URL, {useNewUrlParser: true, UseUnifiedTopology: true});
//     await client.connet();
//   }
// }

const getAllUsers = async (req, res) => {
  try{
    const users = await User.find({});
    res.status(200).json(users);
  }catch(err){
    console.log("Error during getAllUsers : " , err);
    return res.status(500).send("Server error");
  }
};

const signup = async (req, res) => {
  const {username, password, email} = req.body;
  try{
    const user = await User.findOne({username});
    if(user){
      return res.status(400).send({message: "User already exists!"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username, password: hashedPassword, email});
    const savedUser =  await newUser.save();
    const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
    return res.status(200).json({token, userId: savedUser._id});
  }catch(err){
    console.log("Error during signup : " , err);
    return res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  try{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).send({message: "Invalid credentials!"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).send({message: "Invalid credentials!"});
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
    return res.status(200).json({token, userId: user._id});
  }catch(err){
    console.log("Error during login : " , err);
    return res.status(500).send("Server error");
  }
};

const getUser = async (req, res) => {
  try{
    const {id} = req.params;
    if(!id) return res.status(400).send({message: "Invalid user ID!"});
    const user = await User.findById(id);
    if(!user){
      return res.status(404).send({message: "User not found!"});
    }
    return res.status(200).json(user);
  }catch(err){
    console.log("Error during getProfile : " , err);
    return res.status(500).send("Server error");
  }
};

const updateUser = async (req, res) => {
  try{
    const {id} = req.params;
    const {email, password} = req.body;
    const user = await User.findById(id);
    if(!user){
      return res.status(404).send({message: "User not found!"});
    }
    user.email = email;
    if(password){
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    const updatedUser = await user.save();
    return res.status(200).json(updatedUser);
  }catch(err){
    console.log("Error during updateProfile : " , err);
    return res.status(500).send("Server error");
  }
};

const deleteUser = async (req, res) => {
  try{
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
      return res.status(404).send({message: "User not found!"});
    }
    return res.status(200).json(user);
  }catch(err){
    console.log("Error during updateProfile : " , err);
    return res.status(500).send("Server error");
  }
};

export default { getAllUsers, signup, login, getUser, updateUser, deleteUser };