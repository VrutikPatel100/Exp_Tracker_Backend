const expenseSchema = require("../models/ExpenseModel")

const createExpense = async(req,res)=>{


    try{

        const userId = req.user._id;
        const savedExpense = await expenseSchema.create({...req.body,userId:userId})
        res.status(201).json({
            message:"expense created..",
            data:savedExpense
        })


    }catch(err){

        res.status(500).json({
            message:"error while creating expense.."
        })
    }


}
const getExpesneByUserId = async(req,res)=>{
    try {
        const userId = req.user._id;
        var sort = req.query.sort || 1;
        sort = parseInt(sort);
        var datesort = req.query.date || 1
        datesort = parseInt(datesort);
        console.log(datesort)
        const type = req.query.type || "expense"
        let expenses;
        if(type =="expense"){
            //if type is expense then  fetch title description amount expDate paymentMode expCat     
            //fetch only thoese data where income filed is not there
             expenses = await expenseSchema.find({userId:userId,income:{$exists:false}},["title","description","amount","expenseDate","paymentMode","expCat"]).populate("expCat").sort({amount:sort,expenseDate:datesort})
        }
        else{
            //if type is income then fetch title description incomeCategory income expDate
            ////fetch only thoese data where expense filed is not there
             expenses = await expenseSchema.find({userId:userId,amount:{$exists:false}},["title","description","income","expenseDate","incomeCategory","paymentMode"]).populate("incomeCategory").sort({income:sort,expenseDate:datesort})
        }
        
        console.log(
                expenses.map(e => e.expenseDate)
            );
        res.status(200).json({
            message:"expense",
            data:expenses
        })
    } catch (err) {
        console.error("Error in getExpesneByUserId:", err);
        res.status(500).json({
            message: "Error while fetching expenses/income",
            error: err.message
        });
    }
}

const searchExp = async(req,res)=>{
    const userId = req.user._id;
    const expName = req.query.expName || "";
    var expamount = req.query.expamount || "";
    if(expamount){
        expamount = parseInt(expamount);
    }

    
    try{
        const foundexp = await expenseSchema.find({
            userId: userId,
            $or:[
                { title: { $regex: expName, $options: 'i' } },
                 { description: { $regex: expName, $options: 'i' } },
            ]
        }).populate("expCat")

        res.json({
            message: "search successful",
            data: foundexp
        })  
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: "error while searching expense" })
    }
}


const uploadReceipt = async(req,res)=>{

    const expId = req.body.expId;
    const file = req.file;
    //clodudiary upload --> req.file.path
    //return cloudinaryResponse --> secure_url
    const updateExp = await expenseSchema.findByIdAndUpdate(expId,{expReceipt:file.path})
    res.status(200).json({
        message:"receipt uploaded successfully",
        data:updateExp
    })


}
const deleteExpense = async (req, res) => {

    try {

        const deletedExpense = await expenseSchema.findByIdAndDelete(
            req.params.id
        )

        res.status(200).json({
            message: "Expense deleted successfully",
            data: deletedExpense
        })

    } catch (err) {

        res.status(500).json({
            message: "Error while deleting expense"
        })
    }
}




module.exports={
    createExpense,
    getExpesneByUserId,
    searchExp,
    uploadReceipt,
    deleteExpense
}