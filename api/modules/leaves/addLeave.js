const database = require("../../../config/database");
const mysql = require("mysql")
const addLeave = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into file_upload (type,name) values ('leave_document_image'," + mysql.escape(req.file.filename) + ")", (err, fileResult, fields) => {
            database.query("Insert into attendance (check_in_datetime,employee_id,status,approval_document_id) values("+req.body.date+","+req.body.employee_id+",'On leave',"+fileResult.insertId+")" , (err, attendanceData, fields) => {
                database.query("Insert into leaves (employee_id,date,approval_status,recall_head,head_approval) values("+req.body.employee_id+","+req.body.date+",'Pending',1,1)",(err,leaveData,fields)=>{
                    res.send(leaveData)
                })
                    
            })
        })
        }



    })

}

module.exports=addLeave