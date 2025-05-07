const Event=require('../model/Event');
const cloudinary= require('cloudinary').v2;

const getEvents=async (req,res)=>{
    //console.log('Events requested');
    const events=await Event.find();
    if(!events){
        return res.status(204).json({message:'No events found'});
    }
    res.json(events);
}
const newEvent=async (req,res)=>{
    //console.log('new event requested');
    if(!req?.body){
        return res.status(400).json({message:'Attach event object'});
    }
    try{
        const{
            title,
            eventLevel,
            eventType,
            venue,
            venueType,
            host,
            startDate,
            endDate,
            judgeFee,
            speakerFee,
            observerFee,
            speakerLink,
            judgeLink,
            observerLink,
            paymentDetails,
            description,
            displayed
        }=req.body;
        const created=await Event.create({
            title,
            eventLevel,
            eventType,
            venue,
            venueType,
            host,
            startDate,
            endDate,
            judgeFee,
            speakerFee,
            observerFee,
            poster: req.file?.path,
            speakerLink,
            judgeLink,
            observerLink,
            paymentDetails,
            description,
            displayed
        });
        return res.status(201).json({message:'Event created successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Failed to create event'});
    }
}
const deleteEvent=async (req,res)=>{
    console.log('Delete event requested');
    const {id}=req.params;
    try{
        const tobeDeleted=await Event.findById(id).exec();
        if(!tobeDeleted){
            return res.status(404).json({message:'Event not found'})
        }
        //delete image from cloudinary
        if (tobeDeleted.photo) {
            const regex = /\/JDSweb\/([^\/]+)\.(jpg|jpeg|png)$/;
            const match = tobeDeleted.photo.match(regex);
            if (match && match[1]) {
              const publicId = `JDSweb/${match[1]}`;
              await cloudinary.uploader.destroy(publicId);
            }
          }
        //delete from db
        const result=await Event.deleteOne({_id: id});
        res.json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Failed to delete event'});
    }
}
const updateEvent=async (req,res)=>{
    if(!req?.body?._id){
        return res.status(404).json({message:'ID parameter not included'});
    }
    const existing= await Event.findById(req.body._id).exec();
    if(!existing){
        return res.status(404).json({message:'Event not Found'});
    }
    try{
        let photoURL=existing.photo;//default to current if no new photo uploaded
        if(req.file){
            //Attempt to delete old photo
            const publicId = existing.photo? existing.photo.split('/').slice(-1)[0].split('.')[0] : null ;
            const folder = 'JDSweb';
            if (publicId) {
                await cloudinary.uploader.destroy(`${folder}/${publicId}`);
                console.log('Old photo deleted');
            } else {
                console.log('No valid photo ID found to delete');
            }
            //new Cloudinary image url
            photoURL=req.file.path;
        }
        const{
            title,
            eventLevel,
            eventType,
            venue,
            venueType,
            host,
            startDate,
            endDate,
            judgeFee,
            speakerFee,
            observerFee,
            speakerLink,
            judgeLink,
            observerLink,
            paymentDetails,
            description,
            displayed
        }=req.body;
        const replaced= await Event.findByIdAndUpdate(
            req.body._id,
            {
                title,
                eventLevel,
                eventType,
                venue,
                venueType,
                host,
                poster:photoURL,
                startDate,
                endDate,
                judgeFee,
                speakerFee,
                observerFee,
                speakerLink,
                judgeLink,
                observerLink,
                paymentDetails,
                description,
                displayed
            },
            {new:true, overwrite:true}
        );
        res.json(replaced);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Failed to update event'});
    }
};

module.exports={
    getEvents,
    newEvent,
    updateEvent,
    deleteEvent
}