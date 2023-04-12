
const database = require("../../../config/database");
const getAttendance = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT roles.role_name,employees.employee_id,employees.name,floors.name AS floor_name,attendance.status,attendance.check_in_datetime as datetime FROM attendance  LEFT JOIN employees ON employees.id=attendance.employee_id RIGHT JOIN job_details ON employees.job_details_id=job_details.id RIGHT JOIN floors ON job_details.floor_id=floors.id left join roles on job_details.role_id=roles.id where attendance.check_in_datetime>=" + req.query.date_time_first + "and attendance.check_in_datetime<= " + req.query.date_time_second , (err, attendanceResult, fields) => {
                res.send(attendanceResult) 
                    
            })
        }


    })

}

module.exports=getAttendance