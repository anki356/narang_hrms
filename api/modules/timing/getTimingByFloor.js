
const database = require("../../../config/database");
const getTimingByFloor = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Floor Incharge','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT floors.name as floor_name,employees.id as employees_id,employees.name,employees.employee_id as empID,timing.in_time,timing.out_time,timing.timer,timing.approval_status from timing left join employees on employees.id=timing.employee_id left join job_details on employees.job_details_id=job_details.id left join floors on floors.id=job_details.floor_id where timing.date>="+req.query.from_date+"and timing.date<"+req.query.to_date+"and floors.name="+req.query.floor_name , (err, timingResult, fields) => {
                res.send(timingResult) 
                    
            })
        }


    })

}

module.exports=getTimingByFloor