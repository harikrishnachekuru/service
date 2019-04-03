var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        default:''
    },
    password: {
        type: String,
        default:''
    },
    first_name: {
        type: String,
        default:''
    },
    last_name: {
        type: String,
        default:''
    },
    phone_number: {
        type: Number,
        default:''
    },
    passion: {
        type: String,
        default:''
    },
    profession: {
        type: String,
        default:''
    },
    location :{
        type: String,
        default:''
    },
    email :{
        type: String,
        default:''
    },
    overview:{
        type: String,
        default:''
    },
    stream:{
        type: String,
        default:''
    },
    point_of_interest:{
        type: String,
        default:''
    },
    imageUrl:{
        type:String,
        default:''
    }
});
var UserS = mongoose.model("profile", userSchema);
module.exports = UserS;