const userModel = require("../Models/User")

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

        if(isStudent){
            const response = await userModel.
        }



    } catch (error) {
        console.log(error)
        return res.json({message:"There was some error while creating the user",success:false})
    }
}

module.exports = { createUser }