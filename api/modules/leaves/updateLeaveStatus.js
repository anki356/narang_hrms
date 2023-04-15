const database = require("../../../config/database");
const mysql=require('mysql')
const updateLeaveStatus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Update attendance set approval_by_id="+role_id+", approval_date=current_timestamp() where check_in_datetime>="+mysql.escape(req.body.from_date)+" and check_in_datetime<="+mysql.escape(req.body.to_date)+" and employee_id="+req.body.employee_id , (err, attendanceData, fields) => {
                console.log(err)
                database.query("Update leaves set approval_status="+mysql.escape(req.body.status)+" where from_date>="+mysql.escape(req.body.from_date)+" and to_date<="+mysql.escape(req.body.to_date)+" and employee_id="+req.body.employee_id , (err, leaveData, fields) => {
                    console.log(err)
                res.send(leaveData) 
                    
            })
        })
        }


    })

}

module.exports=updateLeaveStatus