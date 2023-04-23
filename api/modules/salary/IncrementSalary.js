const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const incrementSalary = async(req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
        if(req.body.type==='percentage'){
            database.query("select amount from base_salaries where employee_id="+req.body.employee_id,(err,baseSalariesResult)=>{   
                let amount=(100+req.body.percentage)/100*baseSalariesResult[0].amount
            database.query("Insert into salaries_increment (employee_id,amount,date,percentage,type) values("+req.body.employee_id+","+amount+","+mysql.escape(req.body.date)+","+req.body.percentage+",'percentage')",(err,incrementSalariesResult)=>{   
       database.query("update base_salaries set amount="+amount+" where employee_id="+req.body.employee_id,(err,baseSalariesResult)=>{
        console.log(err)
        res.json({"baseSalariesResult":baseSalariesResult,"incrementSalariesResult":incrementSalariesResult})
       })
    })
})
        }
        else{
            database.query("select amount from base_salaries where employee_id="+req.body.employee_id,(err,baseSalariesResult)=>{   
                let amount=req.body.amount+baseSalariesResult[0].amount
                database.query("Insert into salaries_increment (employee_id,amount,date,type) values("+req.body.employee_id+","+req.body.amount+","+mysql.escape(req.body.date)+",'flat')",(err,incrementSalariesResult)=>{   
                database.query("update base_salaries set amount="+amount+" where employee_id="+req.body.employee_id,(err,baseSalariesResult)=>{
                 console.log(err)
                 res.json({"baseSalariesResult":baseSalariesResult,"incrementSalariesResult":incrementSalariesResult})
                })
            })
             })

        }
        }
    })
        
      
}

module.exports=incrementSalary