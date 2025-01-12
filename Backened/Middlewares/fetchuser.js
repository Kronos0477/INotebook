var jwt = require('jsonwebtoken');
const JWT_SECRET = 'youare';
const fetchuser = async(req,res,next)=>{
//    Get the user from the Jwt Token and add id to req object
const token = req.header('auth-token')
if(!token){
    res.status(401).send({error:"Please authenticate using a valid user "})
}
try{
   const data = jwt.verify(token,JWT_SECRET)
   req.user = data
    next()
}catch(error){
    res.status(401).send({error:"Please authenticate using a valid user "})

}

}

module.exports = fetchuser;