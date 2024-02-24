const mongoose = require("mongoose")

const eventRoomSchema = new mongoose.Schema({
    EventRoomName:{
        type:String,
        required:true
    },
    EventRoomEventNow:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    EventRoomEventTimeSlot:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("eventRoomModel",eventRoomSchema)