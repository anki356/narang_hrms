
const database = require("../../../config/database");
const getAttendanceByEmployeeName = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            
            database.query('SELECT file_upload.name as photo, roles.role_name,employees.employee_id,employees.name as employee_name,floors.name AS floor_name,attendance.status,attendance.check_in_datetime as datetime FROM attendance   JOIN employees ON employees.id=attendance.employee_id left JOIN job_details ON employees.job_details_id=job_details.id left JOIN floors ON job_details.floor_id=floors.id left join roles on job_details.role_id=roles.id left join file_upload on file_upload.id=employees.photo_id where attendance.check_in_datetime>=' + req.query.from_date + 'and attendance.check_in_datetime<' + req.query.to_date+"and employees.name ="+req.query.employee_name, (err, attendanceResult, fields) => {
                console.log(err)
                res.send(attendanceResult) 
                    
            })
        }


    })

}

module.exports=getAttendanceByEmployeeName