var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
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
complexity: {
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
}
,
imageUrl:{
    type:String,
    default:''
}
});
var Project = mongoose.model("project", projectSchema);
module.exports = Project;