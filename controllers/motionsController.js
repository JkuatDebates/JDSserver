const Motion=require('../model/Motion.js');

const getMotions=async(req,res)=>{
    const motions=await Motion.find();
    if(!motions) return res.status(204).json({"message":'No motions found in DB'});
    res.json(motions);
}
const addMotion=async(req, res)=>{
    const motions=await Motion.find();
    if(!req.body.motion){
        return res.status(400).json({"message":'Please enter a motion'});
    }
    try{
        const newMotion=await Motion.create({
            motion: req.body.motion,
            infoslide: req.body.infoslide,
            theme:req.body.theme,
            type:req.body.type,
            source:req.body.source            
        });
        res.status(201).json(newMotion);
    }
    catch(err){
        console.log(err);
    }
}
const updateMotion= async (req,res)=>{
    try{
        const updated=await Motion.findOneAndUpdate({_id:req.body._id},{
            $set:{
                motion:req.body.motion,
                infoslide:req.body.infoslide,
                type:req.body.type,
                theme:req.body.theme,
                source:req.body.source
            }},{new: true});
        if(!updated) return res.status(204).json({"message":'could not find id'})
        res.json(updated);
    }
    catch(err){
        console.log(err);
    }
}
const deleteMotion=async(req,res)=>{
    if(!req?.params?.id){
        return res.status(400).json({"message":"Select an existing motion"});
    }
    const deleted=await Motion.findOne({_id: req.params.id}).exec();
    if(!deleted){
        return res.status(204).json({"message":'No such motion exists'});
    }
    const result=await Motion.deleteOne({_id: req.params.id});
    res.json(result);
}

module.exports={
    getMotions,
    addMotion,
    deleteMotion,
    updateMotion
}