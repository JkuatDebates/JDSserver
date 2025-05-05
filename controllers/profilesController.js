const Profile = require('../model/Profile');
const cloudinary= require('cloudinary').v2;

const getProfiles=async (req,res)=>{
    const profiles=await Profile.find();
    if(!profiles)return res.status(204).json({"message":'No profiles found'});
    res.json(profiles);
}
const newProfile=async (req,res)=>{
    console.log('new profile request received');
    if(!req?.body?.name){
        return res.status(400).json({"message":"Name is required"});
    }
    
    try{
        const {
            name,
            alias,
            clubRoles,
            accolades,
            startYear,
            stillActive,
            catchPhrase,
            rumor,
            passions,
            trainingRoles,
        } =req.body;
        const created= await Profile.create({
            name,
            alias,
            photo: req.file?.path, //Cloudinary image URL
            clubRoles: JSON.parse(clubRoles|| '[]'),
            accolades: JSON.parse(accolades|| '[]'),
            startYear,
            stillActive,
            catchPhrase,
            rumor,
            passions: JSON.parse(passions || '[]'),
            trainingRoles: JSON.parse(trainingRoles || '[]')
        });
        return res.status(201).json({message:"Profile created successfully", profile: created});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to create profile"});
    }
}

const replaceProfile=async (req,res)=>{
    if(!req?.body?._id){
        return res.status(404).json({message:'ID parameter not included'})
    }
    const existing= await Profile.findById(req.body._id).exec();
    if(!existing){
        return res.status(404).json({message:'Profile not Found'});
    }
    try{
        let photoURL=existing.photo;//default to current if no new photo uploaded
        if(req.file){
            //Extract public_id from exiting photo
            const regex=/\/profiles\/([^\/]+)\.(jpg|jpeg|png)$/;
            const match= existing.photo?.match(regex);
            if(match && match[1]){
                const publicId=`profiles/${match[1]}`;
                await cloudinary.uploader.destroy(publicId);
            }
            //new Cloudinary image url
            photoURL=req.file.path;
        }
        const {
            name,
            alias,
            clubRoles,
            accolades,
            startYear,
            stillActive,
            catchPhrase,
            rumor,
            passions,
            trainingRoles,
            isVisible
        }=req.body;
        const replaced= await Profile.findByIdAndUpdate(
            req.body._id,
            {
                name,
                alias,
                photo: photoURL,
                clubRoles: JSON.parse(clubRoles|| '[]'),
                accolades: JSON.parse(accolades|| '[]'),
                startYear,
                stillActive,
                catchPhrase,
                isVisible,
                rumor,
                passions: JSON.parse(passions || '[]'),
                trainingRoles: JSON.parse(trainingRoles || '[]'),
            },
            {new:true, overwrite:true}
        );
        res.json(replaced);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to replace profile"});
    }
};
const updateProfile=async (req,res)=>{
    const {id}= req.params;
    let updates= {...req.body};

    try{
        //optional: upload photo if a new one was sent
        if(req.file){
            const result= await streamUpload(req.file.buffer);
            updates.photo= result.secure_url;
        }
        //Parse arrays or objects if needed
        if (updates.clubRoles) updates.clubRoles=JSON.parse(updates.clubRoles);
        if (updates.accolades) updates.accolades=JSON.parse(updates.accolades);
        if (updates.trainingRoles) updates.trainingRoles=JSON.parse(updates.trainingRoles);
        if (updates.passions) updates.passions=JSON.parse(updates.passions);
        
        const updated= await Profile.findByIdAndUpdate(id, updates,{new: true});
        if(!updated) return res.status(404).json({message: 'Profile not found'});

        res.json(updated);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to update profile"});
    }
}
const deleteProfile=async (req,res)=>{
    const { id }= req.params;
    try{
        const tobeDeleted=await Profile.findById(id).exec();
        if(!tobeDeleted){
            return res.status(404).json({message:'Profile not found'})
        }
        //delete image from cludinary
        if (tobeDeleted.photo) {
            const regex = /\/profiles\/([^\/]+)\.(jpg|jpeg|png)$/;
            const match = tobeDeleted.photo.match(regex);
            if (match && match[1]) {
              const publicId = `profiles/${match[1]}`;
              await cloudinary.uploader.destroy(publicId);
            }
          }
        //delete from db
        const result=await Profile.deleteOne({_id: id});
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to delete profile"});
    }
}

module.exports={
    getProfiles,
    newProfile,
    replaceProfile,
    updateProfile,
    deleteProfile
}