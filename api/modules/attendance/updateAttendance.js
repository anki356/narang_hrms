const database = require("../../../config/database");
const mysql = require("mysql")
const updateAttendance= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            if(req.body.approval_status==='Approved'){
            database.query("Insert into file_upload (type,name) values ('attendance_image',"+mysql.escape(req.body.file)+")",(err,fileResult,fields)=>{ 
               
                database.query("Update attendance_requests set status="+mysql.escape(req.body.approval_status)+",date_time="+mysql.escape(req.body.date_time)+" where attendance_id="+req.params.id, (err, attendanceRequestResult, fields) => {
                   console.log(err)
                   
                    database.query("Update attendance set check_in_datetime="+mysql.escape(req.body.date_time)+",status="+mysql.escape(req.body.status)+",approval_document_id="+fileResult.insertId+", status_by_id ="+ role_id+",status_date=current_timestamp(),no_of_shifts="+req.body.no_of_shifts+" where id= "+req.params.id, (err, attendanceResult, fields) => {
                        console.log(err)
                        res.json({"attendanceResult":attendanceResult,"attendanceRequestResult":attendanceRequestResult}) 
                            
                    })
                })
            })
                }   
                else{
                    database.query("Update attendance_requests set status="+mysql.escape(req.body.approval_status)+" where attendance_id="+req.params.id, (err, attendanceRequestResult, fields) => {
                        console.log(err)
                    database.query("Update attendance set status='Absent' , status_by_id ="+ role_id+",status_date=current_timestamp() where id= "+req.params.id, (err, attendanceResult, fields) => {
                        console.log(err)
                        res.json({"attendanceResult":attendanceResult,"attendanceRequestResult":attendanceRequestResult}) 
                            
                    })
                })

                } 
               
            
            
               
        
          
        }


    })

}

module.exports=updateAttendance