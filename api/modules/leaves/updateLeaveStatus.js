const database = require("../../../config/database");
const mysql=require('mysql')
const moment=require('moment')
const updateLeaveStatus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin','HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            if(req.body.status==='Approved'){

                database.query("Update attendance set status_by_id="+role_id+", status_date=current_timestamp(),status='On Leave' where check_in_datetime>="+mysql.escape(req.body.from_date)+" and check_in_datetime<="+mysql.escape(req.body.to_date)+" and employee_id="+req.body.employee_id+" and status='Pending'" , (err, attendanceData, fields) => {
                    console.log(err)
                    database.query("Update leaves set status="+mysql.escape(req.body.status)+",reason="+mysql.escape(req.body.reason)+" where from_date>="+mysql.escape(req.body.from_date)+" and to_date<="+mysql.escape(req.body.to_date)+" and employee_id="+req.body.employee_id , (err, leaveData, fields) => {
                        console.log(err)
                    res.send(leaveData) 
                        
                })
            })
            }
            else{
                var from_date = moment(req.body.from_date)
                var to_date = moment(req.body.to_date)
              if (moment(req.body.from_date).diff(new Date())){
                database.query("Update attendance set status='Absent' where check_in_datetime>="+mysql.escape(req.body.from_date)+" and check_in_datetime<="+mysql.escape(moment(req.body.from_date).add(1,'d').format("YYYY-MM-DD"))+" and employee_id="+req.body.employee_id , (err, leaveData, fields) => {
                    console.log(err)
                    
           
                database.query("delete  from attendance where check_in_datetime>="+mysql.escape( moment(req.body.from_date).add(1,'d').format("YYYY-MM-DD"))+" and check_in_datetime<="+mysql.escape(req.body.to_date)+" and employee_id="+req.body.employee_id , (err, attendanceData, fields) => {
                    console.log(err)
                    database.query("Update leaves set status="+mysql.escape(req.body.status)+",reason="+mysql.escape(req.body.reason)+" where from_date>="+mysql.escape(req.body.from_date)+" and to_date<="+mysql.escape(req.body.to_date)+" and employee_id="+req.body.employee_id , (err, leaveData, fields) => {
                        console.log(err)
                    res.send(leaveData) 
                        
                })
            })
        })
              }
              else{

                  database.query("delete attendance where check_in_datetime>="+mysql.escape(req.body.from_date)+" and check_in_datetime<="+mysql.escape(req.body.to_date)+" and employee_id="+req.body.employee_id , (err, attendanceData, fields) => {
                      console.log(err)
                      database.query("Update leaves set status="+mysql.escape(req.body.status)+",reason="+mysql.escape(req.body.reason)+" where from_date>="+mysql.escape(req.body.from_date)+" and to_date<="+mysql.escape(req.body.to_date)+" and employee_id="+req.body.employee_id , (err, leaveData, fields) => {
                          console.log(err)
                      res.send(leaveData) 
                          
                  })
              })
              }

            }
        }


    })

}

module.exports=updateLeaveStatus