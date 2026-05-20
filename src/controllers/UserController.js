const userSchema = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailSend = require("../utils/MailUtil");
const jwt = require("jsonwebtoken")
const secret = "secret"

const createUser = async (req, res) => {
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const savedUser = await userSchema.create({
      ...req.body,
      password: hashedPassword,
    });
    //mail..
    await mailSend(
      savedUser.email,
      "Welcome Mail",
      "Welcome to expense manager app",
    );
    if (savedUser) {
      res.status(201).json({
        message: "user created..",
      });
    } else {
      res.status(500).json({
        message: "user not created..",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error while creating user..",
    });
  }
};
const getAllUsers = async (req, res) => {
    const query = req.query
  try {
    const users = await userSchema.find(query);
    res.status(200).json({
      message: "users",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while ferching user",
      err: err,
    });
  }
};
const deleteUser = async (req, res) => {
    try{

        const deleteduser = await userSchema.findByIdAndDelete(req.params.id)

        res.status(200).json({
            message:"user deleted successfully",
            data:deleteduser
        })
    }catch(err){
        res.status(500).json({
            message:"Error while deleting user",
            err:err
        })
    }
};

const loginUser = async(req,res)=>{

   const {email,password} = req.body;
   try{

      const foundUserFromEmail =await userSchema.findOne({email:email})
      console.log(foundUserFromEmail)
      if(foundUserFromEmail){

        //compare encrypted and plain passwoerd
        if(bcrypt.compareSync(password,foundUserFromEmail.password)){
          //token generate..
          const token = jwt.sign(foundUserFromEmail.toObject(),secret)
          res.status(200).json({
            message:"login success",
            //data:foundUserFromEmail
            token:token
          })
        }
        else{
          res.status(401).json({
            message:"invalid credentials",
          })
        }

      }
      else{
        res.status(404).json({
          message:"user not found.."
        })
      }
      


   }catch(err){
   }
}

const getProfile = async (req, res) => {

  try {
    const userId = req.user._id
    const user = await userSchema.findById(userId)

    res.status(200).json({
      message: "Profile fetched successfully",
      data: user

    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
    message: "Error while fetching profile"

    })

  }

}

const uploadProfile = async (req, res) => {

    try {

        res.status(200).json({

            message: "Image uploaded successfully",

            image: req.file.path
        })

    } catch (err) {

        res.status(500).json({

            message: "Upload failed"
        })
    }
}


const uploadProfilePic = async (req,res)=>{
  // const expId = req.body.expId;
  const userId = req.user._id;
  const file = req.file;

  const updateExp = await userSchema.findByIdAndUpdate(userId,{profilePic:file.path},{ new:true })
  res.status(200).json({
    message:"profile picture uploaded successfully",
    data:updateExp
  })
}

const updateProfile = async (req,res)=>{

    try{

        const userId = req.user._id

        const updatedUser =
        await userSchema.findByIdAndUpdate(

            userId,

            req.body,

            {new:true}
        )

        res.status(200).json({

            message:"Profile Updated",

            data:updatedUser
        })

    }catch(err){

        res.status(500).json({

            message:"Update Failed",

            error:err.message
        })
    }
}

module.exports = {
  createUser,
  getAllUsers,
  deleteUser,
  loginUser,
  getProfile,
  uploadProfile,
  uploadProfilePic,
  updateProfile
};