const userModel = require("../Models/User")
const committeeModel = require("../Models/Committee")

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


module.exports = { isAccountActive,getAllCommittees }