const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const incrementSalary = async(req,res,next) => {
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
        if(req.body.type==='Percentage'){
            database.query("select amount from base_salaries where employee_id="+req.body.employee_id,(err,baseSalariesResult)=>{   
                let amount=((100+Number(req.body.amount))/100)*Number(baseSalariesResult[0].amount)
            database.query("Insert into salaries_increment (employee_id,amount,date,increment,type) values("+req.body.employee_id+","+amount+","+mysql.escape(req.body.date)+","+req.body.amount+",'percentage')",(err,incrementSalariesResult)=>{   
                console.log(err)
       database.query("update base_salaries set amount="+amount+" where employee_id="+req.body.employee_id,(err,baseSalariesResult)=>{
        console.log(err)
        res.json({"baseSalariesResult":baseSalariesResult,"incrementSalariesResult":incrementSalariesResult})
       })
    })
})
        }
        else{
            database.query("select amount from base_salaries where employee_id="+req.body.employee_id,(err,baseSalariesResult)=>{   
                let amount=Number(req.body.amount)+Number(baseSalariesResult[0].amount)
                database.query("Insert into salaries_increment (employee_id,amount,date,type,increment) values("+req.body.employee_id+","+amount+","+mysql.escape(req.body.date)+",'flat',"+req.body.amount+")",(err,incrementSalariesResult)=>{   
                database.query("update base_salaries set amount="+amount+" where employee_id="+req.body.employee_id,(err,baseSalariesResult)=>{
                 console.log(err)
                 res.json({"baseSalariesResult":baseSalariesResult,"incrementSalariesResult":incrementSalariesResult})
                })
            })
             })

        }
        }
    })
    })
        
      
}

module.exports=incrementSalary