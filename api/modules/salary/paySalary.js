const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const paySalary = async(req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Salary'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
database.query("update advance set payment_status='Paid' where date>="+mysql.escape(req.body.from_date)+" and status='Approved' and date<"+mysql.escape(req.body.to_date),(err,advanceResult)=>{
    console.log(err)
    let month=moment(req.body.from_date).month()
    database.query("update loan_repayment set status='Paid' where month="+month+" and loan_id=(select id from loan where employee_id="+req.body.employee_id+" and status='Approved')",(err,loanResult)=>{
        console.log(err)
        database.query("update expenses set payment_status='Paid'  where date>="+mysql.escape(req.body.from_date)+" and status='Approved' and date<"+mysql.escape(req.body.to_date),(err,expenseResult)=>{
            console.log(err)
            database.query("update fines set payment_status='Paid' where date>="+mysql.escape(req.body.from_date)+"  and status='Approved' and date<"+mysql.escape(req.body.to_date),(err,fineResult)=>{
              
                console.log(err)
                  database.query("update salaries set status='Paid' where id="+req.params.id,(err,salaryResult)=>{
                    console.log(err)
        res.json({
            "advanceResult":advanceResult,
            "loanResult":loanResult,
            "expenseResult":expenseResult,
            "fineResult":fineResult,
            "salaryResult":salaryResult
        })
                })  
            })   
        })
    })
})



        }
    })
    })
}
module.exports=paySalary