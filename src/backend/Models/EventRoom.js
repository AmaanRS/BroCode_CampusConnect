const mongoose = require("mongoose")

//Since there are 3 rooms and 3 timeslots there will be 9 combinations for booking
//eg Room1 Slot1
//eg Room1 Slot2
//eg Room1 Slot3
//eg Room2 Slot1 and so on
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
        enum:["Slot1","Slot2","Slot3"]
    },
    isEventRoomBooked:{
        type:String,
        enum:["true","false","pending"],
    }
})

module.exports = mongoose.model("eventRoomModel",eventRoomSchema)