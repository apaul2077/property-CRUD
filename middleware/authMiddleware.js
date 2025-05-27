import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';

const verifyToken = expressAsyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user =  await userModel.findById(decoded.userId).select('-password');
            next();
        }
        catch{
            res.status(401);
            throw new Error("Unauthorized - Invalid token");
        }
    }
    else{
        res.status(401);
        throw new Error("Unauthorized - No token obtained");
    }
});

export { verifyToken };