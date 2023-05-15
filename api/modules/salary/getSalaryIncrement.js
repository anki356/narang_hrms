const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const getSalaryIncrement = (req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
        
      
         database.query("select *,base_salaries.amount as base_salary,salaries_increment.amount as increment  from salaries_increment left join employees on employees.id=salaries_increment.employee_id left join base_salaries on base_salaries.employee_id=salaries_increment.employee_id where salaries_increment.employee_id="+req.query.employee_id,(err,salariesIncrementResult,fields)=>{
                console.log(err)
            res.send(salariesIncrementResult)
               
            })  
        

        
        
    }
    })
   


}

module.exports=getSalaryIncrement