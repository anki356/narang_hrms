const database = require("../../../config/database");
const mysql = require("mysql")
const moment = require('moment')
const addLeave = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into file_upload (type,name) values ('leave_document_image'," + mysql.escape(req.file.filename) + ")", (err, fileResult, fields) => {
                var from_date = moment(req.body.from_date, 'DD-MM-YYYY');
                var to_date = moment(req.body.to_date, 'DD-MM-YYYY');
                let d = to_date.diff(from_date, 'days');
                let attendanceArray = []
                for (let i = 0; i <= d; i++) {

                    let day = moment(req.body.from_date, 'DD-MM-YYYY').add(i, 'd')
                   
if(day.format("DD-MM-YYYY")===moment(new Date()).format("DD-MM-YYYY")){
   
database.query("Update attendance set status='On Leave' where check_in_datetime="+mysql.escape(day.toDate())+"and employee_id="+req.body.employee_id,(err, attendanceData, fields) => {

    attendanceArray.push(attendanceData)
})
}
else{
    database.query("Insert into attendance (check_in_datetime,employee_id,status,approval_document_id) values(" + mysql.escape(day.toISOString(true)) + "," + req.body.employee_id + ",'On leave'," + fileResult.insertId + ")", (err, attendanceData, fields) => {

        attendanceArray.push(attendanceData)
    })
}

                    
                }
                database.query("Insert into leaves (employee_id,from_date,to_date,approval_status,recall_head,head_approval) values(" + req.body.employee_id + "," + mysql.escape(from_date.toISOString(true)) + "," + mysql.escape(to_date.toISOString(true)) + ",'Pending',1,1)", (err, leaveData, fields) => {
                    console.log(err)
                    res.json({ "leaveData": leaveData, "attendanceArray": attendanceArray })
                })

            })

        }



    })

}

module.exports = addLeave