const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const axios=require("axios");
const { oauth2client } = require("../utils/googleConfig");

//user registration
const register = async(req,res) => {
   try{
    console.log(req.body.email);
     // check if user already exists
     const userExists = await User.findOne({email: req.body.email})
     
     if(userExists){
        res.status(200).send({
            message: "User already exists.",
            success: false
        })
     }
     else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(200).send({
            message: "User registered successfully.",
            success: true
        })
     }
   }
   catch(error){
      res.status(400).send({
        message: error.message,
        data: error,
        success: false
      })
   }
}

//user login
const login = async(req,res) => {
   try{

     const user = await User.findOne({email: req.body.email})
    //  console.log(req.body.email);
    if (user.googleId && !user.password) {
        return res.status(200).json({
          message: "This email is registered via Google. Please log in using Google.",
          success: false
        });
      }
     if(user){
        const passwordsMatched = await bcrypt.compare(req.body.password,user.password)
        //check if passwords are valid
        if(passwordsMatched){
            const token = jwt.sign({
                userid: user._id
            },process.env.JWT_SECRET_CODE,{
                expiresIn: "1d"
            })
            res.send({
              message: "User logged in successfully",
              data: token,
              success: true,
            })
        }
        else{
            res.status(200).send({
                message: "Invalid Password",
                success: false
            })
        }
     }
     else{
        res.status(200).send({
            message: "User doesnot exist.",
            success: false
        })
     }     
   }
   catch(error){
    res.status(400).send({
        message: error.message,
        data: error,
        success: false
    })
   }
}

const loginWithGoogle=async(req,res)=>{
    try{
       const {code}=req.query
       
       
       const googleRes=await oauth2client.getToken(code)
       oauth2client.setCredentials(googleRes.tokens)

       const userRes=await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
       )
       
      
       const { email, id, name }=userRes.data
       const googleId=id
       
       let user = await User.findOne({email})
       if(!user){
        try{
        user=await User.create({email,googleId,name})
        }
        catch(err){
            console.log(err);  
        }
       }
       
       const token = jwt.sign({
        userid: user._id
    },process.env.JWT_SECRET_CODE,{
        expiresIn: "1d"
    })
    res.send({
      message: "User logged in successfully",
      data: token,
      success: true,
    })
       
    }
    catch(error){
        res.status(400).send({
            message: error.message,
            data: error,
            success: false
        })

    }
}

//get user info
const getUserInfo = async(req,res) => {
   try{
      const user = await User.findOne({_id: req.body.userid})
      if(user){
        res.status(200).send({
            message: "User Info fetched successfully",
            data: user,
            success: true
        })
      }
      else{
        res.status(200).send({
            message: "Failed to fetch user info",
            data: null,
            success: false
        })
      }
   }
   catch(error){
    res.status(400).send({
        message: error.message,
        data: error,
        success: false
    })
   }
}

module.exports = { register, login, getUserInfo ,loginWithGoogle}