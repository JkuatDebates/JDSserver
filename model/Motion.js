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
    source:String,
    votes:{
            type:[{
            email:String,
            voteType:{
                type: String,
                enum:['up','down']
            }
            }],
            default:[{email:''}]
}
});

module.exports=mongoose.model('Motion',motionSchema);