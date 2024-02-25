const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
    RequestEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "eventModel",
    },
    RequestEventRoom:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "eventRoomModel",
    },
    RequestToUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    RequestToCreateNewUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    RequestCommittee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "committeeModel",
    },
    RequestStatus:{
        type:String,
        enum:["accepted","rejected","pending"],
        required:true
    }
})

module.exports = mongoose.model("requestModel",requestSchema)