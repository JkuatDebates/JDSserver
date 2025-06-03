const mongoose=require('mongoose');
const Schema= mongoose.Schema;

const articleSchema=new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: String,
        required: true
    },
    datePublished:{
        type: Date,
        required: true,
        default: Date.now
    },
    tag:{
        type: String,
        enum:['Debate Topics','Personal Takes', 'Other','Tournament Review','PS Topics','Training'],
        default: 'Other'
    },
    content:{
        type:[{blockTag: String, blockData:String}],
        required: true
    },
    displayed:{
        type: Boolean,
        default: false
    }
});

module.exports=mongoose.model('Article',articleSchema);