const Motion=require('../model/Motion.js');

const getMotions=async(req,res)=>{
    const motions=await Motion.find();
    if(!motions) return res.status(204).json({"message":'No motions found in DB'});
    res.json(motions);
}

module.exports={
    getMotions
}