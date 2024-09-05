//it use the jwt token to authenticate the user with stamp that are added at the time of signup. it return true and false for the valid user

const { json } = require('express');
const jwt = require('jsonwebtoken')
const auth = async(req,res,next)=>
{
  const stamp = req.header('stamp')// req ke body nhi header se stamp nikalo
  if(!stamp)//if stamp not found
    return res.stamp(401).json({msg:"no token ,Unauthorized access"});

    //if found
   const verifyStamp = jwt.verify(stamp,"secretkey") //verify stamp
     if(!verifyStamp)//if not verified
       return res.stamp(401).json({msg:"token is unauthorized"})
    //if verifyied then send data to body\
    req.user= verifyStamp.id;
    req.stamp=stamp;
    next();   //next funtion at router/auth.js file authRouter.get('/',auth,async(req,res)
}
module.exports= auth;