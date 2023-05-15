const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const getSalaryHistory = (req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
        
      
         database.query("select *,employees.employee_id as empID  from salaries left join employees on employees.id=salaries.employee_id where salaries.employee_id="+req.query.employee_id,(err,salariesResult,fields)=>{
            console.log(err)   
            res.send(salariesResult)
               
            })  
        

        
        
    }
    })
   


}

module.exports=getSalaryHistory