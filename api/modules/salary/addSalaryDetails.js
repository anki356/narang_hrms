const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const addSalaryDetails = async(req,res,next) => {
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
        let month=moment().month()
        let total_earnings=req.body.computed+req.body.commission
        let total_deductions=req.body.expense+req.body.tea+req.body.advance+req.body.loan
database.query("Insert into salaries (employee_id, working_days, month, computed, commission, expense, tea, advance, loan_emi, total_earnings, total_deductions, net_salary, status, esi, pf, basic_salary, hra, days_shown, cash_incentive,net_payable_salary)values ("+req.body.employee_id+","+req.body.working_days+","+month+","+req.body.computed+","+req.body.commission+","+req.body.expense+","+req.body.tea+","+req.body.advance+","+req.body.loan+","+total_earnings+","+total_deductions+","+req.body.net_salary+",'Paid',"+req.body.esi+","+req.body.pf+","+req.body.basic+","+req.body.hra+","+req.body.days+","+req.body.cash_incentive+","+req.body.net_payable_salary+")",(err,salariesResult)=>{
    res.send(salariesResult)
})

        }
    })
    })
        
      
}

module.exports=addSalaryDetails