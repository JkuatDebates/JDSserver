const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const profileSchema=new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    alias: String,
    photo: {
        type: String,
        required: true
    },
    clubRoles: [String],
    accolades: [String],
    startYear: Date,
    stillActive:Boolean,
    catchPhrase: String,
    rumor: String,
    passions: [String],
    trainingRoles: [String],
    isVisible:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('Profile',profileSchema);