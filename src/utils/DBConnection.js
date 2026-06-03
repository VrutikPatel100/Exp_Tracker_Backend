const mongoose = require("mongoose")

const DBConnection = ()=>{

    mongoose.connect("mongodb+srv://vrutik:vrutik@cluster0.bk9ugee.mongodb.net/backend_Expense").then(()=>{
        console.log("database connected..")
    }).catch((err)=>{
        console.log("error while connecting db..")
    })

}
module.exports = DBConnection