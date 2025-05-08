const User=require('../model/User');
const bcryptjs= require('bcryptjs');
const jwt=require('jsonwebtoken');

const register=async (req,res)=>{
    const {username, password, email}= req.body;
    const hashed=await bcryptjs.hash(password,10);
    try{
        const newUser= await User.create({
            username,
            password: hashed,
            email
        });
        console.log(newUser);
        res.status(201).json({message:'User registered successfully'});
    }
    catch(err){
        console.log(error);
    }
}
const login=async (req,res)=>{
    const {email, password}=req.body;
    try{
        const user=await User.findOne({email}).exec();
        if(!user){
             return res.status(404).json({message:'User not registered'});
            }        
        const matching= await bcryptjs.compare(password, user.password);
        if(!matching){
            return res.status(401).json({message:'Wrong password'});
        }
        const token=jwt.sign({
            "userInfo":{
                'id':user._id,
                'username':user.username,
                'role':user.role,
                'email':user.email
            }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        res.cookie('jwt',token, {httpOnly: true, maxAge:24*60*60*1000}).status(200).json({token});
    }
    catch(err){
        console.log(error);
    }
}

module.exports={
    register,
    login
}