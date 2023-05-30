const database = require("../../../config/database");
const mysql = require("mysql")
const moment = require('moment')
const addLeave = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head', 'Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            var from_date = moment(req.body.from_date)
            var to_date = moment(req.body.to_date)
            let d = to_date.diff(from_date, 'days');
            let attendanceArray = []

            let from_array = []
            
            for (let i = 0; i <= d; i++) {

                let day = moment(req.body.from_date).add(i, 'd')
                from_array.push(day.format("YYYY-MM-DD"))

            }
            let queryString=''
            from_array.forEach((data,index)=>{
                if(index!==from_array.length-1){
                    queryString+=mysql.escape(data)+","
                }
                else{
                    queryString+=mysql.escape(data)
                }

            })
            console.log(queryString)
            database.query("select id from attendance where check_in_datetime  in (" + queryString + ") and employee_id="+req.body.employee_id, (err, duplicateResult) => {
                console.log(err)
                if (duplicateResult.length === 0) {
            database.query("Insert into file_upload (type,name) values ('leave_document_image'," + mysql.escape(req.file.filename) + ")", (err, fileResult, fields) => {
               
             
                   
                        for (let i = 0; i <= d; i++) {

                            let day = moment(req.body.from_date).add(i, 'd')
                            if (day.format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY")) {

                                database.query("Update attendance set status='Pending' where check_in_datetime=" + mysql.escape(day.format("YYYY-MM-DD")) + "and employee_id=" + req.body.employee_id, (err, attendanceData, fields) => {

                                    attendanceArray.push(attendanceData)
                                })
                            }
                            else {
                                

                                database.query("Insert into attendance (check_in_datetime,employee_id,status,approval_document_id) values(" + mysql.escape(day.format("YYYY-MM-DD")) + "," + req.body.employee_id + ",'Pending'," + fileResult.insertId + ")", (err, attendanceData, fields) => {

                                    attendanceArray.push(attendanceData)
                                })
                            }


                        }
                        database.query("Insert into leaves (employee_id,from_date,to_date,status,recall_head,head_approval,approval_document_id) values(" + req.body.employee_id + "," + mysql.escape(from_date.toISOString(true)) + "," + mysql.escape(to_date.toISOString(true)) + ",'Pending'," + req.body.recall_head + "," + req.body.head_approval + "," + fileResult.insertId + ")", (err, leaveData, fields) => {
                            console.log(err)
                            res.json({ "leaveData": leaveData, "attendanceArray": attendanceArray })
                        })
                    
                })
            }
            else{
                res.json({error:"409",mssg:"Duplicate Entry"})
            }

            })
        }




    })

}

module.exports = addLeave