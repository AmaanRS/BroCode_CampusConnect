const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    username:{
        type:String,
        trim:true
    },
    password:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    isStudent:{
        type:Boolean,
        default:false
    },
    isPrincipal:{
        type:Boolean,
        default:false
    },
    isHod:{
        type:Boolean,
        default:false
    },
    isTeacher:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    Department:{
        type:String
    },
    isAccountActive:{
        type:String,
        enum:["true","false","pending"],
        default:false
    },
    Requests:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
        }
    ]
},{
    timestamps:true
})

module.exports = mongoose.model("userModel",userModel)