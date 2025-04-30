const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const motionSchema=new Schema({
    motion:{
        type: String,
        required: true
    },
    infoSlide: String,
    theme: String,
    type: String,
    source:String
});

module.exports=mongoose.model('Motion',motionSchema);