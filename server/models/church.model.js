import mongoose from "mongoose"

const churchSchema = new mongoose.Schema({
    registrationId: {type: String}, // if its a church
    name: {type:String, required: true},
    password:{type:String, required:true, minlength:6},
    profilePic:{type:String,default:""},
    city: {type:String, required: true },
    state: {type:String, required: true },
    country: {type:String , required: true},
    location: {type:String},
    contact: {type:Number},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"User", required: true}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref:"Post"}],
});


const ChurchModel = mongoose.model("Church", churchSchema);