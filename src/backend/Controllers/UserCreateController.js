const userModel = require("../Models/User")
const requestModel = require("../Models/Request")

const createUser = async (req,res)=>{
    try {
        const { email,
        username,
        department,
        isStudent,
        isPrincipal,
        isHod,
        isTeacher,
        isAdmin } = req.body


        if(!username || !department){
            return res.json({message:"Please enter the username and department",success:false})
        }

        //Either of the fields should be true
        if(!isStudent && !isPrincipal && !isHod && !isTeacher && !isAdmin ){
            return res.json({message:"The user should either be Student or Principal or Hod or Teacher or Admin",success:false})
        }

        //Get the admin
        const admin = await userModel.findOne({isAdmin:true})

        //If admin exists and someone is trying to create one more
        if(admin && isAdmin){
            return res.json({message:"There can be only one Admin",success:false})
        }

        //Get the department's Hod
        const hod = await userModel.findOne({isHod:true,Department:department})

        //If Hod for the department exists and someone is trying to create one more
        if(hod && isHod ){
            return res.json({message:"For this department there can be only one Hod",success:false})
        }

        //Check if Admin is trying to login for the first time
        if(isAdmin){
            const response = await userModel.findOneAndUpdate({email:email},{
                username:username,
                Department:department,
                isAdmin:isAdmin,
                isAccountActive:"true"
            },{new:true})

            if(!response){
                return res.json({message:"User could not be updated",success:false})
            }

            return res.json({message:"Your Account is now Active and Working",success:true})
        }

        //Check if Student is trying to login for the first time
        else if(isStudent){
            const response = await userModel.findOneAndUpdate({email:email},{
                username:username,
                Department:department,
                isStudent:isStudent,
                isAccountActive:"true"
            },{new:true})

            if(!response){
                return res.json({message:"User could not be updated",success:false})
            }

            return res.json({message:"Your Account is now Active and Working",success:true})
        }

        //Check if Hod is trying to login for the first time
        else if(isHod){
            const response = await userModel.findOneAndUpdate({email:email},{
                username:username,
                Department:department,
                isHod:isHod,
                isAccountActive:"pending"
            },{new:true})

            if(!response){
                return res.json({message:"User could not be updated",success:false})
            }

            //Get the admin's id
            const admin = await userModel.findOne({isAdmin:true})

            if(!admin){
                return res.json({message:"There is a problem while fetching Admin",success:false})
            }

            //Create a Request to Admin for Hod Account Creation
            const resOfRequest = await requestModel.create({
                RequestToUser:admin._id,
                RequestStatus:"pending",
                RequestToCreateNewUser:response._id
            })

            if(!resOfRequest){
                return res.json({message:"Request for verification could not be created",success:false})
            }

            return res.json({message:"Your email Id has been sent to admin for verfication",success:true})
        }

        //Check if Teacher is trying to login for the first time
        else if(isTeacher){
            const response = await userModel.findOneAndUpdate({email:email},{
                username:username,
                Department:department,
                isTeacher:isTeacher,
                isAccountActive:"pending"
            },{new:true})

            if(!response){
                return res.json({message:"User could not be updated",success:false})
            }

            //Get the Hod which is from the same department as the teacher which is being created
            const hod = await userModel.findOne({isHod:true,Department:department})

            const resOfRequest = await requestModel.create({
                RequestToUser:hod._id,
                RequestStatus:"pending",
                RequestToCreateNewUser:response._id
            })

            if(!resOfRequest){
                return res.json({message:"Request for verification could not be created",success:false})
            }

            return res.json({message:"Your email Id has been sent to your department hod for verfication",success:true})
        }

        //Check if Principal is trying to login for the first time
        else if(isPrincipal){
            const response = await userModel.findOneAndUpdate({email:email},{
                username:username,
                Department:department,
                isPrincipal:isPrincipal,
                isAccountActive:"pending"
            },{new:true})

            if(!response){
                return res.json({message:"User could not be updated",success:false})
            }

            //Get the admin's id
            const admin = await userModel.findOne({isAdmin:true})

            if(!admin){
                return res.json({message:"There is a problem while fetching Admin",success:false})
            }

            //Create a Request to Admin for Hod Account Creation
            const resOfRequest = await requestModel.create({
                RequestToUser:admin._id,
                RequestStatus:"pending",
                RequestToCreateNewUser:response._id
            })

            if(!resOfRequest){
                return res.json({message:"Request for verification could not be created",success:false})
            }

            return res.json({message:"Your email Id has been sent to admin for verfication",success:true})
        }

    } catch (error) {
        console.log(error)
        return res.json({message:"There was some error while creating the user",success:false})
    }
}

module.exports = { createUser }