//register

const userModel = require("../../models/userModel")
const bcrypt  =  require("bcrypt")

const userSignUpController  = async (req,res)=>{
    try {

        const {name,email,password} =  req.body
        // console.log(name)
        if (!name) {
            return res.send({ message: "Name is Required" });
          }
          if (!email) {
            return res.send({ message: "Email is Required" });
          }
          if (!password) {
            return res.send({ message: "Password is Required" });
          }
          if(password.length<8){
            return res.json({success: false , message : 'Please enter strong password' })
        }


        //   if (!cpassword) {
        //     return res.send({ message: "Password is Required" });
        //   }
        //   if(cpassword.length<8){
        //     return res.json({success: false , message : 'Please enter strong password' })
        // }

        // if(password === cpassword){
        //     return res.json({success: false , message : 'Password and Confirm Password should be same'})
        // }



        const exists =  await userModel.findOne({email})

        if(exists){
            return res.json({success:false,message:"User already exists"})
        }


        //hash password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        // const hashedCpassword = await bcrypt.hash(cpassword,salt)





      const payload = {
        ...req.body,
        password:hashedPassword
      }


        const userData =  new userModel(payload)


        const user = await userData.save()
        res.json({success:true,message:"User Registered Successfully",data:user,role:"GENERAL"})
        
    } catch (error) {

        res.json({message:error, error:true,success:false})

        
    }

}



module.exports = userSignUpController

