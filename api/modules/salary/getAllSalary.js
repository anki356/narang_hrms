const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const getAllSalary = async ( req,res,next) => {
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
            let queryString="select salaries.*,base_salaries.amount as base_salary,employees.min_wages_as_per_rule,employees.id as employee_id,roles.role_name as role_name,employees.name as employee_name,floors.name AS floor_name,locations.name as location_name ,employees.employee_id as empID from salaries left join employees on employees.id =salaries.employee_id left join job_details on job_details.id=employees.job_details_id left JOIN floors ON job_details.floor_id=floors.id left join roles on job_details.role_id=roles.id left join file_upload on file_upload.id=employees.photo_id left join locations on locations.id=job_details.location_id left join base_salaries on base_salaries.employee_id=employees.id where month="+req.query.month +" and year="+req.query.year+" and employees.status=1"
            if(req.query.floor_name){
                queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
               }
               if(req.query.location_name){
                queryString+=" and locations.name="+ mysql.escape(req.query.location_name)
               }
               if(req.query.role_name){
                queryString+=" and roles.role_name= "+mysql.escape(req.query.role_name)
               }
               if(req.query.sub_type){
                queryString+=" and employees.sub_type= "+mysql.escape(req.query.sub_type)
               }
               if(req.query.status){
                queryString+=" and salaries.status in ("+ req.query.status+")"
               }
               
               if(req.query.employee_query){
                queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
               }
               if(req.query.limit){
                queryString+=" limit "+req.query.limit
               }
               if(req.query.offset){
                queryString+=" Offset "+req.query.offset
               }
               console.log(queryString)

database.query(queryString,(err,salary)=>{
    console.log(err)
    res.send(salary)
})

        }
    })
    })
   


}

module.exports = getAllSalary