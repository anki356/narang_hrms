const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const addTimingyByFI = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select * from  timing where employee_id="+req.body.employee_id+" and date="+mysql.escape(req.body.date)+" and in_time is null", (err, timingOutResult, fields) => {
                if(timingOutResult.length===0){

                    database.query("Insert Into timing (employee_id,date,timer,approval_status,reason,status_date,status_id) values("+req.body.employee_id+","+mysql.escape(req.body.date)+","+mysql.escape(req.body.timer)+","+mysql.escape(req.body.approval_status)+","+mysql.escape(req.body.reason)+",current_timestamp(),"+role_id+")", (err, timingResult, fields) => {
                        console.log("err",err)
                        res.send(timingResult) 
                            
                    })
                }
                else{
                    res.sendStatus(409)
                }
               
            })
        }


    })

}

module.exports=addTimingyByFI