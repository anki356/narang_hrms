
const database = require("../../../config/database");
const mysql = require("mysql")
const getTimingsByEmployeeId = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Floor Incharge','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT file_upload.name as photo,employees.id as employees_id,employees.name,employees.employee_id as empID,timing.in_time,timing.out_time,timing.approval_status, floors.name as floor_name from timing left join employees on employees.id=timing.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id where timing.date>="+req.query.from_date+"and timing.date<"+req.query.to_date+"and employees.employee_id="+mysql.escape(req.query.employee_id) , (err, timingResult, fields) => {
                res.send(timingResult) 
                    
            })
        }


    })

}

module.exports=getTimingsByEmployeeId