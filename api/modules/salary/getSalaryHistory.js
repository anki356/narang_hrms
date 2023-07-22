const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const getSalaryHistory = (req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Employee Detail'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
      
         database.query("select *,salaries.status as paid_status, employees.employee_id as empID  from salaries left join employees on employees.id=salaries.employee_id where salaries.employee_id="+req.query.employee_id +" and employees.status=1",(err,salariesResult,fields)=>{
            console.log(err)   
            res.send(salariesResult)
               
            })  
        

        
        
    }
})
    })
   


}

module.exports=getSalaryHistory