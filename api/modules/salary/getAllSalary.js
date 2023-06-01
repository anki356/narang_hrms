const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const getAllSalary = async ( req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
database.query("select salaries.*,employees.id as employee_id,employees.name as employee_name,employees.employee_id as empID from salaries left join employees on employees.id =salaries.employee_id left join job_details on job_details.id=employees.job_details_id where month="+req.query.month,(err,salary)=>{
    console.log(err)
    res.send(salary)
})

        }
    })
   


}

module.exports = getAllSalary