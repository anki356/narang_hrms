const database = require("../../../config/database");
const mysql = require("mysql")
const updateAttendance= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into file_upload (type,name) values ('attendance_image',"+mysql.escape(req.file.filename)+")",(err,fileResult,fields)=>{ 
                database.query("Update attendance set check_in_datetime="+req.body.date_time+",status="+req.body.status+",approval_document_id="+fileResult.insertId+", approval_by_id ="+ role_id+",approval_date=current_timestamp()where id= "+req.params.id, (err, attendanceResult, fields) => {
                    res.send(attendanceResult) 
                        
                })
            })
               
        
          
        }


    })

}

module.exports=updateAttendance