const { Router } = require("express");
const {UserModel} = require('../Models/userModel')
const userRouter = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


userRouter.post('/signup', async(req,res) => {
    try {
        const{name, email, password} = req.body;
        let user = await UserModel.findOne({'email':email});
        if(user){
            return res.status(409).json({
                error:"Conflict",
                message: "User already exist"
            })
        }
        bcrypt.hash(password, 4, async function(err, hash){
            if(err){
                return res.status(400).json({
                    error:err,
                    message: 'something went wrong'
                })
            }
            let new_user = new UserModel({
                name,
                email,
                password:hash
            })
            await new_user.save();
        })
        res.status(200).json({
            success: true,
            message: 'Signup Successfull'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Sever Error",
            error: error.message
        })
    }
})


userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUser = await UserModel.findOne({ email });
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: "User does not exist!"
            })
        }
        const hashed_password = isUser.password;

        bcrypt.compare(password, hashed_password, function (err, result) {
            if (err) {
                return res.status(400).json({
                    error: err,
                    message: "something went wrong"
                })
            }
            if (!result) {
                return res.status(401).json({
                    message: "Wrong Credentials",
                    error: "Unauthorized",
                    success: "false"
                })
            }
            else {
                let token = jwt.sign({ userID: isUser._id }, process.env.SECRET_KEY);
                return res.status(200).json({
                    success: true,
                    message: "Login Successfull",
                    token,
                    isUser,
                })
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Sever Error",
            error: error.message
        })
    }
})


module.exports = {
    userRouter
}