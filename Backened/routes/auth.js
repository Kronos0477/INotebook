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
    body('Password','Enter a Valid Passoword').isLength({min:5}),
],async (req,res)=>{
  // if there are errors return the bad request ;

  const error=validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()});
  }

  // Check whether the user with the same email exist:
  try {
    
 
  let user = await   User.findOne({Email:req.body.Email})
  if(!user){
  const salt = await  bcrypt.genSalt(16);
  secpass = await bcrypt.hash(req.body.Password , salt)

   
// create a new user :
    user = await User.create({
      Username : req.body.Username,
      Email: req.body.Email,
      Password : secpass,
    })
  }else{
   return res.status(400).json({"errormessage" : 'The email already exist'})
  }

  const data ={
    id:user.id

  }
  const authtoken = jwt.sign(data,JWT_SECRET);

  res.json(authtoken)
  // console.log(jwtdata)
  // res.json({user}) 
} catch (error) {
  res.status(500).send('Internal server error ')
}  
})

// Router a user :  Authenticate a User :


router.post('/login',[
  body('Email','Enter a Valid Email').isEmail(),
  body('Password','Password cant be blank ').exists(),
  
],async (req,res)=>{


  const error=validationResult(req);
  if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()});
  }
  const {Email,Password} = req.body;
  try {
    let user =await  User.findOne({Email})
    if(!user){
      return res.status(400).json({error:"Please enter correct credentials"});

    }

    const passwordcompare = await bcrypt.compare(Password,user.Password)
    if(!passwordcompare){
      return res.status(400).json({error:"Please enter correct credentials"});
    }
   
  const data ={
    id:user._id

  }
  const authtoken = jwt.sign(data,JWT_SECRET);

  res.json({authtoken})
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error ')
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