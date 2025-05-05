const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const eventSchema=new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    eventType:{
        type: String,
        enum:['Online','Physical','Hybrid'],
        required: true
    },
    eventLevel:{
        type: String,
        enum:['University','High School','Grade School'],
        required: true
    },
    venue:{
        type: String,
        required: true,
        default: 'TBA'
    },
    startDate: Date,
    endDate: Date,
    startTime: Date,
    registrationFee:{
        judgeFee: Number,
        speakerFee: Number,
        observerFee: Number
    },
    poster: String,
    registrationLinks:{
        speakerLink: String,
        judgeLink: String,
        observerLink:String
    },
    paymentDetails: String,
    description:String,
    displayed:{
        type: Boolean,
        default: false
    }
});

module.exports=mongoose.model('Event',eventSchema);