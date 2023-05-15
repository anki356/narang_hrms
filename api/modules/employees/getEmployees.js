const database = require("../../../config/database");
const mysql=require('mysql')
const getEmployees = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT base_salaries.amount as base_salary,file_upload.name as photo,job_details.*,bank_details.*,floors.name as floor_name,stores.*,employees.name as employee_name,roles.*,store_departments.name as store_department_name,employees.*,employees.employee_id as empID from employees left join job_details on job_details.id=employees.job_details_id left join bank_details on bank_details.id=employees.bank_details_id left join floors on floors.id =job_details.floor_id left join stores on stores.id =job_details.store_id left join roles on roles.id=job_details.role_id left join store_departments on store_departments.id=job_details.store_department_id left join file_upload on file_upload.id=employees.photo_id left join base_salaries on base_salaries.employee_id=employees.id where employees.created_on>="+mysql.escape(req.query.from_date)+" and employees.created_on<"+mysql.escape(req.query.to_date)+" and employees.created_on is not null "
            if(result[0].role_name.split(" ")[0]==='Floor'){
                database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    console.log(err)
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id
                })
                
               }
            if(req.query.floor_name){
                queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
               }
               if(req.query.store_name){
                queryString+=" and stores.name="+ mysql.escape(req.query.store_name)
               }
               if(req.query.role_name){
                queryString+=" and roles.role_name="+ mysql.escape(req.query.role_name)
               }
               if(req.query.employee_query){
                queryString+="and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
               }
               if (req.query.type){
                queryString+="and employees.type = "+req.query.type
               }
               if (req.query.sub_type){
                queryString+=" and employees.sub_type = "+req.query.sub_type
               }
               queryString+=" limit "+req.query.limit+" Offset "+req.query.offset
            database.query(queryString , (err, employeesResult, fields) => {
                console.log(err)
              res.send(employeesResult)
            })
        }



    })

}

module.exports=getEmployees