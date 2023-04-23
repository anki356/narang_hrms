const database = require("../../../config/database");
const mysql = require("mysql")
const makeAttendanceCorrectionRequests= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into attendance_requests (employee_id,date_time,attendance_id,status) values("+mysql.escape(req.body.employee_id)+","+mysql.escape(req.body.date_time)+","+mysql.escape(req.body.attendance_id)+",'Pending')",(err,AttendanceRequestData,fields)=>{
                res.send(AttendanceRequestData)
            })
               
        
          
        }


    })

}

module.exports=makeAttendanceCorrectionRequests