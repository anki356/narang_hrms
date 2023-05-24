const database = require("../../../config/database");
const mysql = require("mysql")
const makeAttendanceCorrectionRequests= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into attendance_requests (employee_id,type,reason,date_time,attendance_id,status) values("+mysql.escape(req.body.employee_id)+","+mysql.escape(req.body.type)+","+mysql.escape(req.body.reason)+","+mysql.escape(req.body.date_time)+","+req.body.attendance_id+",'Pending')",(err,AttendanceRequestData,fields)=>{
                console.log(err)
                database.query("Insert into file_upload (type,name) values ('attendance_document',"+mysql.escape(req.body.file)+")",(err,fileResult,fields)=>{ 
                database.query("Insert into attendance_requests_documents (attendance_id,document_id) values("+req.body.attendance_id+","+fileResult.insertId+")",(err,attendanceDocumentResult)=>{
                database.query("update attendance set status='Pending' where id="+mysql.escape(req.body.attendance_id),(err,attendanceResult)=>{

                    res.json({"AttendanceRequestData":AttendanceRequestData,"attendanceResult":attendanceResult,"attendanceDocumentResult":attendanceDocumentResult})
                })
            })
            })
            })
               
        
          
        }


    })

}

module.exports=makeAttendanceCorrectionRequests