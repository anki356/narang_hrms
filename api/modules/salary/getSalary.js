const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const getSalary = async ( req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
database.query("select *, employees.*,employees.name as employee_name,head_employees.name as head_employee_name, roles.role_name as role_name,employees.employee_id as empID,job_details.*,floors.name as floor_name,stores.name as store_name,store_departments.name as store_department_name from salaries left join employees on employees.id =salaries.employee_id left join job_details on job_details.id=employees.job_details_id left join base_salaries on base_salaries.employee_id=employees.id left join employees as head_employees on head_employees.id =job_details.head_employee_id left join floors on floors.id=job_details.floor_id left join stores on job_details.store_id=stores.id left join roles on job_details.role_id=roles.id left join store_departments on store_departments.id=job_details.store_department_id where salaries.id="+req.query.id,(err,salary)=>{
    console.log(err);
    res.send(salary)
})

        }
    })
   


}

module.exports = getSalary