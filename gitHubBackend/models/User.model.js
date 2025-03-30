import mongoose from 'mongoose';
const {Schema} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  repositories: [{
    type: Schema.Types.ObjectId,
    ref: 'Repository'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  staredrepos: [{
    type: Schema.Types.ObjectId,
    ref: 'Repository',
  }],
});

import Repository from './Repository.model.js';

userSchema.post("findOneAndDelete", async (user) => {
  if(user) await Repository.deleteMany({_id: { $in: user.repositories}});
});

const User = mongoose.model('User', userSchema);

export default User;