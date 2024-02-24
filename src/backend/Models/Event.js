const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    EventName:{
        type:String,
        required:true
    },
    EventDescription: {
        type: String,
        required: true,
        maxlength: 1000,
    },
    EventDate:{
        type:Date,
        required:true,
        min: Date.now(), // the date is not in the past
    },
    EventTimeSlot:{
        type:String,
        required:true
    },
    EventRoom:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventRoom"
    },
    Location: {
        type: String,
        maxlength: 200
    },
    OrganizingCommittee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Committee",
        required: true,
    },
    isEventConfirmed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("eventModel",eventSchema)