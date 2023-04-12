const database = require("../../../config/database");
const getApprovalsByEmployeeName = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Floor Incharge','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT employees.id as employees_id,employees.name,employees.employee_id as empID,timing.in_time,timing.out_time,timing.timer,timing.approval_status from timing left join employees on employees.id=timing.employee_id where timing.approval_status='Approved' and employees.name="+req.query.employee_name , (err, timingResult, fields) => {
                res.send(timingResult) 
                    
            })
        }


    })

}

module.exports=getApprovalsByEmployeeName