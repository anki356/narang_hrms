const database = require("../../../config/database");
const mysql=require('mysql')
const restructureLoans = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin','HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            let current_month=Number(new Date().getMonth())
            database.query("SELECT amount FROM loan_repayment where loan_id="+req.body.loan_id+" and month="+req.body.month,(err,amountResult,fields)=>{
            database.query("Update loan_repayment set amount=0 where loan_id="+req.body.loan_id+" and month="+req.body.month,(err,firstResult,fields)=>{
                console.log(err)
             database.query("SELECT id, MAX(id) as max FROM loan_repayment where loan_id="+req.body.loan_id,(err,secondResult,fields)=>{
                console.log(secondResult)
                database.query("SELECT amount FROM loan_repayment where id="+secondResult[0].max,(err,thirdResult,fields)=>{   
               let finalAmount=amountResult[0].amount+thirdResult[0].amount
                    database.query("update loan_repayment set amount= "+finalAmount+" where id="+secondResult[0].max,(err,fourthResult,fields)=>{
                        console.log(err)
res.send(fourthResult)
                    })
                })
                })
             })  
            })
        }
            
        })

}
module.exports=restructureLoans