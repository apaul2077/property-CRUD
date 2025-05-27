import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const login = asyncHandler(async  (req, res) => {
    const {email, password} = req.body;
    const userExists = await userModel.findOne({ email });
    if(userExists && await userExists.comparePassword(password, userExists.password)){
        generateToken(res, userExists._id);
        res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email
        });
    }   
    else{
        res.status(404);
        throw new Error('Invalid email or password');
    }
}); 

const registerUser = asyncHandler(async  (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await userModel.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const newUser = await userModel.create({ name, email, password });
    if(newUser){
        generateToken(res, newUser._id);
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
         });
    }
    else{
        res.status(400);
        throw new Error('Invalid user data');
    }
}); 


const logoutUser = asyncHandler(async  (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: new Date(0)
    });

    res.status(200).json({message: "Logged out successfully"});
}); 
 
export {
    login,
    registerUser, 
    logoutUser
};