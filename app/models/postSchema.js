var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
user_name:{
        type: String,
        required: true
   },
    title:{
     type: String,
     required: true
},
description: {
     type:String,
    required: true
},
category: {
        type:String,
        default:''
},
technologies_used: {
    type:String,
    default:''
},
keywords: {
    type:String,
    default:''
},
file: {
    type:String,
    default:''
},
date:{
    type:String,
    default:''   
},
imageUrl:{
    type:String,
    default:''
}
});
var User = mongoose.model("tester", postSchema);
module.exports = User;