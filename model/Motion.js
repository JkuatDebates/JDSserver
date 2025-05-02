const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const motionSchema=new Schema({
    motion:{
        type: String,
        required: true
    },
    infoslide: String,
    theme: String,
    type: {
        type:String,
        required: true
    },
    source:String
});

module.exports=mongoose.model('Motion',motionSchema);