const mongoose = require("mongoose")

const committeeSchema = new mongoose.Schema({
    CommitteeName:{
        type:String,
        required:true
    },
    CommitteeDescription: {
        type: String,
        required: true,
    },
    CommitteeMentor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    CommitteeHead:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    CommitteeTechnicalHead:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    CommitteeEvents:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
        }
    ]
      
})

module.exports = mongoose.model("committeeModel",committeeSchema)