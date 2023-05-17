const bcrypt = require('bcrypt');
const User = require('../model/userModel')

const AsyncHandler = require('express-async-handler')
const registerUser =AsyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name && !email && !password){
        res.status(400);
        throw new Error('Please enter all the fields')
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt)

    const checkUser = await User.findOne({email});
    if(checkUser){
        res.status(400)
        throw new Error('User already exists')
    }

    // creates a new user
    await User.create({
        name,email,password:hashedPassword
    })

    res.json({
        name,email,password:hashedPassword
    })
})

const loginUser = AsyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email && !password){
        res.status(400);
        throw new Error('Please enter all the fields')
    }  

    const checkUser = await User.findOne({email});
    if(!checkUser){
        res.status(404);
        throw new Error('user not found')
    }

    if(checkUser && (await bcrypt.compare(password,checkUser.password))){
        res.json({
            id:checkUser._id,
            name:checkUser.name,
            email:checkUser.email,
            password:checkUser.password
        })
    }else{
        res.status(404);
        throw new Error('Invalid Credentials')
    }
})



module.exports = {
    registerUser,
    loginUser
}