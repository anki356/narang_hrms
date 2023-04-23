
const database = require("../../../config/database");
const mysql = require("mysql")
const getTotalSessions = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Floor Incharge','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            if(result[0].role_name==='Floor Incharge'){
                database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                   
                database.query("select count(distinct out_time,timing.employee_id) from timing left join employees on timing.employee_id=employees.id left join job_details on job_details.id=employees.job_details_id where timing.date>="+req.query.from_date+"and timing.date<"+req.query.to_date+" and head_employee_id="+employeesResult[0].id , (err, timingResult, fields) => {
                    
                    res.send(timingResult) 
                        
                })
            })
            }
            else{
                database.query("select count(distinct out_time,timing.employee_id) from timing left join employees on timing.employee_id=employees.id left join job_details on job_details.id=employees.job_details_id left join stores on stores.id=job_details.store_id where timing.date>="+req.query.from_date+"and timing.date<"+req.query.to_date+" and stores.name="+req.query.store_name , (err, timingResult, fields) => {
                   
                    res.send(timingResult) 
                        
                })
            }
           
        }


    })

}

module.exports=getTotalSessions