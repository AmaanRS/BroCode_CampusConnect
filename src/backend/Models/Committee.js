const mongoose = require("mongoose")

const committeeSchema = new mongoose.Schema({
    CommitteeName:{
        type:String,
        required:true,
        unique:true
    },
    CommitteeDescription: {
        type: String,
        required: true,
    },
    CommitteeMentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required:true
    },
    CommitteeHead:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required:true
    },
    CommitteeTechnicalHead:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required:true
    },
    isAccountActive:{
        type:String,
        enum:["true","false","pending"],
        default:false
    },
    CommitteeEvents:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "eventModel"
        }
    ]
      
})

module.exports = mongoose.model("committeeModel",committeeSchema)