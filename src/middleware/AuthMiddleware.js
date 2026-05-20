const jwt = require("jsonwebtoken")

const secret = "secret"

const authMiddleware = (req,res,next)=>{

    try{

        console.log("HEADERS =", req.headers)

        const authHeader = req.headers.authorization

        console.log("AUTH HEADER =", authHeader)

        if(!authHeader){

            return res.status(401).json({
                message:"No token provided"
            })
        }

        if(!authHeader.startsWith("Bearer ")){

            return res.status(401).json({
                message:"Invalid Bearer Token"
            })
        }

        const token = authHeader.split(" ")[1]

        console.log("TOKEN =", token)

        const decoded = jwt.verify(token, secret)

        console.log("DECODED =", decoded)

        req.user = decoded

        next()

    }catch(err){

        console.log("AUTH ERROR =", err)

        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}

module.exports = authMiddleware