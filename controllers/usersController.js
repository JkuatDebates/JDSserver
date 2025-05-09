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
};
const getUsers=async(req,res)=>{
    console.log('users called');
    const users=await User.find();
    if(!users) return res.status(204).json({"message":'No users found in DB'});
    //console.log(users);
    res.json(users);
}
const changePwd=async(req,res)=>{
    console.log('changePwd');
    const {id, password}=req.body;
    try{
        const hashed=await bcryptjs.hash(password,10);
        const updated= await User.findByIdAndUpdate(id, {password: hashed},{new:true});
        if(!updated){
            return res.sendStatus(404);
        }
        res.status(200).json({message:'Password changed'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Error on changePwd'});
    }
};
const resetPwd=async(req,res)=>{
    console.log('resetPwd');
    const {id}=req.body;
    try{
        const hashed=await bcryptjs.hash('password',10);
        const updated=User.findByIdAndUpdate(id,{password: hashed},{new: true}).exec();
        if(!updated){
            return res.status(404).json({message:'Reset error, user not found'});
        }
        res.status(200).json({message:'Password Updated'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'User not found on resetPwd'});
    }
};
const changeUsn=async(req,res)=>{
    console.log('changeUsn');
    const {id, username}=req.body;
    try{
        const updated= await User.findByIdAndUpdate(id, {username: username},{new:true});
        if(!updated){
            return res.sendStatus(404);
        }
        res.status(200).json({message:'Username changed'});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'Error on changeUsn'});
    }
};
const changeRole=async(req,res)=>{
    console.log('changeRole');
    const {id, role}= req.body;
    try{
        const updated=await User.findByIdAndUpdate(id,{role:role},{new: true});
        if(!updated) {
            return res.status(400).json({message:'User not found on role change'});
        }
        res.status(200).json({message:{updated}});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'User not found, role change'});
    }
     
};
const deleteAccount=async(req,res)=>{
    console.log('delete Account!');
    const id= req.params.id;
    const {password}=req.body;
    try{
        const todelete=await User.findById(id).exec();
        if(!todelete){
            return res.status(404);
        }
        const match=await bcryptjs.compare(password, todelete.password);
        if(!match){
            return res.status(401).json({message:'Wrong password'});
        }
        const deleted=await User.deleteOne({_id:id});
        if(!deleted){
            return res.status(404);
        }
        res.json(deleted);
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'User not found, account delete'});
    }
};

module.exports={
    register,
    login,
    changePwd,
    resetPwd,
    changeUsn,
    changeRole,
    deleteAccount,
    getUsers
}