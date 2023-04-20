const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const incrementSalary = async(req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
       database.query("update base_salaries set amount="+req.body.amount+" where employee_id="+req.body.employee_id,(err,baseSalariesResult)=>{
        console.log(err)
        res.send(baseSalariesResult)
       })
        }
    })
        
      
}

module.exports=incrementSalary