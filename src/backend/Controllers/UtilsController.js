const userModel = require("../Models/User")
const committeeModel = require("../Models/Committee")
const requestModel = require("../Models/Request")

const isAccountActive = async (req,res)=>{
    try {
        const { email } = req.body

        const response = await userModel.findOne({email:email})

        if(!response){
            return res.json({message:"User does not exist",success:false})
        }

        return res.json({message:"The status of Account is",success:true,status:response.isAccountActive})
        
    } catch (error) {
        console.log(error)
        return res.json({message:error,success:false})
    }
}

const getAllCommittees = async (req,res)=>{
    try {
        const allCommittees = await committeeModel.find()

        if(!allCommittees){
            return res.json({message:"There was some problem while fetching all the committees",success:false})
        }

        return res.json({message:"Fetched all the committees successfully",success:true,data:allCommittees})
        
    } catch (error) {
        console.log(error)
        return res.json({message:"There was some problem while fetching all the committees",success:false})
    }
}

const fetchRequestOfUser =async (req,res)=>{

    try {

        if(!req.middlewareRes.success){
            return res.json({message:"There user is not Authenticated",success:false})
        }

        const email = req.middlewareRes.decodedToken.email

        if(!email){
            return res.json({message:"There user is not Authenticated",success:false})
        }

        const user = await userModel.findOne({email:email})

        if(!user){
            return res.json({message:"The user does not Exist",success:false})
        }

        const allRequests = await requestModel.find({RequestToUser:user._id})

        if(!allRequests){
            return res.json({message:"The requests for the user could not be fetched",success:false})
        }

        return res.json({message:"Fetched all the Requests successfully",success:true,data:allRequests})

    } catch (error) {
        console.log(error)
        return res.json({message:"There was some problem while fetching request",success:false})

    }

}


module.exports = { isAccountActive,getAllCommittees,fetchRequestOfUser }