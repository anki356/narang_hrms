const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const getSalaryIncrement = (req,res,next) => {
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
        
      
         database.query("select *,salaries_increment.type as increment_type,salaries_increment.amount as amount,salaries_increment.increment as increment  from salaries_increment left join employees on employees.id=salaries_increment.employee_id left join base_salaries on base_salaries.employee_id=salaries_increment.employee_id where salaries_increment.employee_id="+req.query.employee_id +" and employees.status=1",(err,salariesIncrementResult,fields)=>{
                console.log(err)
            res.send(salariesIncrementResult)
               
            })  
        

        
        
    }
})
    })
   


}

module.exports=getSalaryIncrement