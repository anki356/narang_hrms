const database = require("../../../config/database");
const mysql=require('mysql')
const getEmployeesWithTotalOutSessions = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Guard','Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
           
             let queryString="select *,file_upload.name as photo,count(timing.employee_id) as total_outs,employees.id as employee_id,employees.name as employee_name,employees.employee_id as empID,floors.name as floor_name from employees left join timing on timing.employee_id=employees.id left join file_upload on file_upload.id=employees.photo_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id =job_details.floor_id left join locations on locations.id=job_details.location_id left join roles on roles.id=job_details.role_id  where job_details.role_id=8  and timing.date>="+mysql.escape(req.query.from_date)+"and timing.date<"+mysql.escape(req.query.to_date)+" and timing.approval_status='Approved'"
             if(req.query.floor_name){
                queryString+=" and floors.name=" + mysql.escape(req.query.floor_name)
               }
               if(req.query.employee_query){
                queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
               }
queryString+=" group by timing.employee_id"
                database.query(queryString,(err,employeesNotOutResult)=>{
                    console.log(err)
                    res.send(employeesNotOutResult) 
                })
                
                    
            
        }


    })

}

module.exports=getEmployeesWithTotalOutSessions