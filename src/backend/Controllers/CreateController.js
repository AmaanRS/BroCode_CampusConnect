const userModel = require("../Models/User");
const requestModel = require("../Models/Request");
const committeeModel = require("../Models/Committee");
const userModel = require("../Models/User")
const requestModel = require("../Models/Request")
const committeeModel = require("../Models/Committee")
const eventModel = require("../Models/Event")
const eventRoomModel = require("../Models/EventRoom")

const createUser = async (req, res) => {
  try {
    const {
      email,
      username,
      department,
      isStudent,
      isPrincipal,
      isHod,
      isTeacher,
      isAdmin,
    } = req.body;
    console.log({});

    if (!username || !department) {
      return res.json({
        message: "Please enter the username and department",
        success: false,
      });
    }

    //Either of the fields should be true
    if (!isStudent && !isPrincipal && !isHod && !isTeacher && !isAdmin) {
      return res.json({
        message:
          "The user should either be Student or Principal or Hod or Teacher or Admin",
        success: false,
      });
    }

    //Get the admin
    const admin = await userModel.findOne({ isAdmin: true });

    //If admin exists and someone is trying to create one more
    if (admin && isAdmin) {
      return res.json({
        message: "There can be only one Admin",
        success: false,
      });
    }

    //Get the department's Hod
    const hod = await userModel.findOne({
      isHod: true,
      Department: department,
    });

    //If Hod for the department exists and someone is trying to create one more
    if (hod && isHod) {
      return res.json({
        message: "For this department there can be only one Hod",
        success: false,
      });
    }

    //Check if Admin is trying to login for the first time
    if (isAdmin) {
      const response = await userModel.findOneAndUpdate(
        { email: email },
        {
          username: username,
          Department: department,
          isAdmin: isAdmin,
          isAccountActive: "true",
        },
        { new: true }
      );

      if (!response) {
        return res.json({
          message: "User could not be updated",
          success: false,
        });
      }

      return res.json({
        message: "Your Account is now Active and Working",
        success: true,
      });
    }

    //Check if Student is trying to login for the first time
    else if (isStudent) {
      const response = await userModel.findOneAndUpdate(
        { email: email },
        {
          username: username,
          Department: department,
          isStudent: isStudent,
          isAccountActive: "true",
        },
        { new: true }
      );

      if (!response) {
        return res.json({
          message: "User could not be updated",
          success: false,
        });
      }

      return res.json({
        message: "Your Account is now Active and Working",
        success: true,
      });
    }

    //Check if Hod is trying to login for the first time
    else if (isHod) {
      const response = await userModel.findOneAndUpdate(
        { email: email },
        {
          username: username,
          Department: department,
          isHod: isHod,
          isAccountActive: "pending",
        },
        { new: true }
      );

      if (!response) {
        return res.json({
          message: "User could not be updated",
          success: false,
        });
      }

      //Get the admin's id
      const admin = await userModel.findOne({ isAdmin: true });

      if (!admin) {
        return res.json({
          message: "There is a problem while fetching Admin",
          success: false,
        });
      }

      //Create a Request to Admin for Hod Account Creation
      const resOfRequest = await requestModel.create({
        RequestToUser: admin._id,
        RequestStatus: "pending",
        RequestToCreateNewUser: response._id,
      });

      if (!resOfRequest) {
        return res.json({
          message: "Request for verification could not be created",
          success: false,
        });
      }

      return res.json({
        message: "Your email Id has been sent to admin for verfication",
        success: true,
      });
    }

    //Check if Teacher is trying to login for the first time
    else if (isTeacher) {
      const response = await userModel.findOneAndUpdate(
        { email: email },
        {
          username: username,
          Department: department,
          isTeacher: isTeacher,
          isAccountActive: "pending",
        },
        { new: true }
      );

      if (!response) {
        return res.json({
          message: "User could not be updated",
          success: false,
        });
      }

      //Get the Hod which is from the same department as the teacher which is being created
      const hod = await userModel.findOne({
        isHod: true,
        Department: department,
      });

      const resOfRequest = await requestModel.create({
        RequestToUser: hod._id,
        RequestStatus: "pending",
        RequestToCreateNewUser: response._id,
      });

      if (!resOfRequest) {
        return res.json({
          message: "Request for verification could not be created",
          success: false,
        });
      }

      return res.json({
        message:
          "Your email Id has been sent to your department hod for verfication",
        success: true,
      });
    }

    //Check if Principal is trying to login for the first time
    else if (isPrincipal) {
      const response = await userModel.findOneAndUpdate(
        { email: email },
        {
          username: username,
          Department: department,
          isPrincipal: isPrincipal,
          isAccountActive: "pending",
        },
        { new: true }
      );

      if (!response) {
        return res.json({
          message: "User could not be updated",
          success: false,
        });
      }

      //Get the admin's id
      const admin = await userModel.findOne({ isAdmin: true });

      if (!admin) {
        return res.json({
          message: "There is a problem while fetching Admin",
          success: false,
        });
      }

      //Create a Request to Admin for Hod Account Creation
      const resOfRequest = await requestModel.create({
        RequestToUser: admin._id,
        RequestStatus: "pending",
        RequestToCreateNewUser: response._id,
      });

      if (!resOfRequest) {
        return res.json({
          message: "Request for verification could not be created",
          success: false,
        });
      }

      return res.json({
        message: "Your email Id has been sent to admin for verfication",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "There was some error while creating the user",
      success: false,
    });
  }
};

const createCommittee = async (req, res) => {
  try {
    const {
      CommitteeName,
      CommitteeDescription,
      CommitteeHeadEmail,
      CommitteeTechnicalHeadEmail,
    } = req.body;

    if (
      !CommitteeName ||
      !CommitteeDescription ||
      !CommitteeHeadEmail ||
      !CommitteeTechnicalHeadEmail
    ) {
      return res.json({
        message:
          "CommitteeName,CommitteeDescription,CommitteeHeadEmail,CommitteeTechnicalHeadEmail is mandatory",
        success: false,
      });
    }

    if (!req.middlewareRes.success) {
      return res.json({
        message: "There user is not Authenticated",
        success: false,
      });
    }

    const email = req.middlewareRes.decodedToken.email;

    if (!email) {
      return res.json({
        message: "There user is not Authenticated",
        success: false,
      });
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({ message: "The user does not Exist", success: false });
    }

    //If the user is teacher or hod then they can create a committee
    if (user.isTeacher || user.isHod) {
      //Get the Committee Head ObjectId and the Head should be a Student
      const CommitteeHead = await userModel.findOne({
        email: CommitteeHeadEmail,
        isStudent: true,
      });

      if (!CommitteeHead) {
        return res.json({
          message: "The CommitteeHead does not Exist or is Not a Student",
          success: false,
        });
      }

      //Get the Committee Technical Head ObjectId and the Technical Head should be a Student
      const CommitteeTechnicalHead = await userModel.findOne({
        email: CommitteeTechnicalHeadEmail,
        isStudent: true,
      });

      if (!CommitteeTechnicalHead) {
        return res.json({
          message:
            "The CommitteeTechnicalHead does not Exist or is Not a Student",
          success: false,
        });
      }

      //Get the Principal
      const principal = await userModel.findOne({ isPrincipal: true });

      if (!principal) {
        return res.json({
          message:
            "The does not Exist or there is a problem fetching the principal",
          success: false,
        });
      }

      //Create a new Committee
      const newCommittee = await committeeModel.create({
        CommitteeName: CommitteeName,
        CommitteeDescription: CommitteeDescription,
        CommitteeMentor: user._id,
        CommitteeHead: CommitteeHead._id,
        CommitteeTechnicalHead: CommitteeTechnicalHead._id,
        isAccountActive: "pending",
      });

      if (!newCommittee) {
        return res.json({
          message: "Committee could not be created",
          success: false,
        });
      }

      const resOfRequest = await requestModel.create({
        RequestToUser: principal._id,
        RequestCommittee: newCommittee._id,
        RequestStatus: "pending",
      });

      return res.json({
        message:
          "Your Committee has been created Successfully please wait for the principal to verify it",
        success: true,
      });
    } else {
      return res.json({
        message: "You should either be a Teacher or Hod to Create a Committee",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Could not create the event due to some error",
      success: false,
    });
  }
};

const createEvent = async (req, res) => {
  try {
    if (!req.middlewareRes.success) {
      return res.json({
        message: "There user is not Authenticated",
        success: false,
      });
    }

    const email = req.middlewareRes.decodedToken;

    if (!email) {
      return res.json({
        message: "There user is not Authenticated",
        success: false,
      });
    }

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.json({ message: "The user does not Exist", success: false });
    }
            const resOfRequest = await requestModel.create({
                RequestToUser:principal._id,
                RequestCommittee:newCommittee._id,
                RequestStatus:"pending"
            })

            return res.json({message:"Your Committee has been created Successfully please wait for the principal to verify it",success:true})

        }else{
            return res.json({message:"You should either be a Teacher or Hod to Create a Committee",success:false})
        }

        
    } catch (error) {
        console.log(error)
        return res.json({message:"Could not create the event due to some error",success:false})
    }
}

//If a teacher is a mentor to more than one committee then also he will only be able to create a event for the first Committee he created -- BUG
const createEvent =async (req,res)=>{
    try {
        if(!req.middlewareRes.success){
            return res.json({message:"There user is not Authenticated",success:false})
        }

        //The date should be in Date datatype
        //For EventTimeslot check eventModel
        const { 
            EventName,
            EventDescription,
            EventDate,
            EventTimeSlot,
            EventRoom
        } = req.body

        if(!EventName || !EventDescription || !EventDate || !EventTimeSlot || !EventRoom ){
            return res.json({message:"EventName,EventDescription,EventDate,EventTimeSlot are mandatory fields",success:false})
        }

        const email = req.middlewareRes.decodedToken

        if(!email){
            return res.json({message:"There user is not Authenticated",success:false})
        }

        //Current logged in user
        const user = await userModel.findOne({email:email})

        if(!user){
            return res.json({message:"The user does not Exist",success:false})
        }

    // if( user.isTeacher || user.isHod ){
    //     const newEvent = await
    // }
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Could not create the event due to some error",
      success: false,
    });
  }
};
        //If the user is the Mentor of Committee
        const doesCommitteeExists = await committeeModel.findOne({CommitteeMentor:user._id})

        if(!doesCommitteeExists){
            return res.json({message:"You have to be a Mentor of the Committee to Create a Event",success:false})
        }

        //Get the room's id from the database
        const room = await eventRoomModel.findOne({EventRoomName:EventRoom,EventRoomEventTimeSlot:EventTimeSlot,isEventRoomBooked:false})

        if(!room){
            return res.json({message:"This room cannot be booked",success:false})
        }
        
        const newEvent = await eventModel.create(
        {
            EventName:EventName,
            EventDescription:EventDescription,
            EventDate:Date(EventDate),
            EventTimeSlot:EventTimeSlot,
            EventRoom:room._id,
            OrganizingCommittee:doesCommitteeExists._id,
            isEventConfirmed:"pending"
        })

        if(!newEvent){
            return res.json({message:"The Event was not created",success:false})
        }

        const hod = await userModel.findOne({isHod:true,Department:user.Department})

        if(!hod){
            return res.json({message:"The Hod for this department does not exist",success:false})
        }

        const resOfRequest = await requestModel.create({
            RequestEvent:newEvent._id,
            RequestEventRoom:room._id,
            RequestToUser:hod._id,
            RequestCommittee:doesCommitteeExists._id,
            RequestStatus:"pending"
        })

        if(!resOfRequest){
            return res.json({message:"Request could not be sent to HOD",success:false})
        }

        return res.json({message:"Your Event has been Created Successfully Please wait for the Hod of your department to confirm",success:true})
        
    } catch (error) {
        console.log(error)
        return res.json({message:"Could not create the event due to some error",success:false})
    }
}



module.exports = { createUser, createEvent, createCommittee };
