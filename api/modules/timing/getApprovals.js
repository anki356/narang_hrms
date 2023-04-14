
const database = require("../../../config/database");
const getApprovals = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Floor Incharge','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT file_upload.name as photo,  employees.id as employees_id,employees.name,employees.employee_id as empID,timing.in_time,timing.out_time,timing.timer,timing.approval_status from timing left join employees on employees.id=timing.employee_id left join file_upload on file_upload.id=employees.photo_id where timing.approval_status='Approved'" , (err, timingResult, fields) => {
                res.send(timingResult) 
                    
            })
        }


    })

}

module.exports=getApprovals