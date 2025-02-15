const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Email:{
    type:String,
    required:true,
    unique:true,

  },
  Password: {
    type: String,
    required: true,
     },
   ProfileImage:{
    type:String,
  },

},{timestamps:true});

module.exports= mongoose.model('user',UserSchema);
