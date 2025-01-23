const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const {body,validationResult} = require('express-validator');
const User = require('../models/User_Schema');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'youare';
const fetchuser = require('../Middlewares/fetchuser')

// Create a user using : Post "/api/auth/createuser". No login required for getting the login and signup page  :




router.post('/createuser',[
    body('Email','Enter a Valid Email').isEmail(),
    body('Username','Enter a valid Username').isLength({min:3}),
],async (req,res)=>{
  // if there are errors return the bad request ;
  let success = false;
  let {Username,Email,Password} = req.body;
  console.log(Password)
  const error=validationResult(req);
  console.log('here')
  if(!error.isEmpty()){
    return res.status(400).json({error:error.array(),success:success});
  }

  // Check whether the user with the same email exist:
  try {
    
 
  let user = await   User.findOne({Email:req.body.Email})
  if(!user){
    console.log('done');
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(Password, salt);
    Password = hash;
    // Create user in the database
  }else{
    return res.status(400).json({"error" : 'The email already exist',success:success})
  }
  console.log(Password)
  const User_mongo = await User.create({
    Username,
    Email,
    Password,
  });
  console.log(User_mongo._id);

  const data ={
    id:User_mongo._id

  }
  const authtoken = jwt.sign(data,JWT_SECRET);

  success = true;
  return res.json({authtoken:authtoken,success:success})
 
} catch (error) {
  console.log(error)
  return  res.status(500).json({error:'Internal server error ',success:success})
}  
})

// Router a user :  Authenticate a User :


router.post('/login',[
  body('Email','Enter a Valid Email').isEmail(),
  body('Password','Password cant be blank ').exists(),
  
],async (req,res)=>{

let success = false;
console.log(req.body)
  const error=validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({error:error.array(),success:success});
  }
  const {Email,Password} = req.body;
  try {
  
    let user =await  User.findOne({Email})
  
    if(!user){
      // console.log('here')
      return res.json({error:"Please enter correct credentials",success:success});
      
    }
    
 
    const passwordcompare = await bcrypt.compare(Password,user.Password)
    console.log(passwordcompare)
    if(!passwordcompare){
      
      return res.json({error:"Please enter correct credentials",success:success});
    }
   
  const data ={
    id:user._id

  }

  const authtoken = jwt.sign(data,JWT_SECRET);
success = true;
 return res.json({authtoken:authtoken,success:success})
  } catch (error) {
    console.log(error)
   return  res.status(500).json({error:'Internal server error ',success:success})
  }
  




})


// Route # : Get loggedin User details using : Post "/api/auth/getuser". Logined required:

router.post('/getuser',fetchuser,async (req,res)=>{
try {
 const  userId = req.user.id;
  const user = await User.findById(userId).select("-Password");
  res.send({user})

} catch (error) {
   console.log(error)
    res.status(500).send('Internal server error ')
 
}})


module.exports = router;