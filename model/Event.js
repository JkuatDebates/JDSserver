const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const eventSchema=new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    eventLevel:{
        type: String,
        enum:['University','High School','Grade School'],
        required: true
    },
    eventType:{
        type: String,
        enum:['Public Speaking','BP Debate',"World's Debate","PS and BP", "PS and World's"],
        required: true
    },
    venue:{
        type: String,
        required: true,
        default: 'TBA'
    },
    venueType:{
        type: String,
        enum:['Online','Physical','Hybrid'],
        required: true
    },
    startDate: Date,
    endDate: Date,
    judgeFee: Number,
    speakerFee: Number,
    observerFee: Number,
    poster: String,
    speakerLink: String,
    judgeLink: String,
    observerLink:String,
    paymentDetails: String,
    description:String,
    displayed:{
        type: Boolean,
        default: false
    }
});

module.exports=mongoose.model('Event',eventSchema);