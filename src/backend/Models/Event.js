const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
    EventName:{
        type:String,
        required:true
    },
    EventDescription: {
        type: String,
        required: true,
    },
    EventDate:{
        type:Date,
        required:true,
        min: Date.now(), // the date is not in the past
    },
    EventTimeSlot:{
        type:String,
        enum:["Slot1","Slot2","Slot3"],
        required:true
    },
    EventRoom:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "eventRoomModel"
    },
    // Location: {
    //     type: String,
    //     maxlength: 200
    // },
    OrganizingCommittee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "committeeModel",
        required: true,
    },
    isEventConfirmed:{
        type:String,
        enum:["true","false","pending"],
        default:false
    }
})

module.exports = mongoose.model("eventModel",eventSchema)