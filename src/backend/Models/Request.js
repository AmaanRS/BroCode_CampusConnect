const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    RequestEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
    },
    RequestEventRoom:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventRoom",
    },
    RequestToUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    RequestToCreateNewUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    RequestCommittee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Committee",
    },
    RequestStatus:{
        type:String,
        enum:["accepted","rejected","pending"],
        required:true
    }
})

module.exports = mongoose.model("requestModel",requestSchema)