const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const addTiming = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into timing (employee_id,date,out_time,approval_status,reason) values("+req.body.employee_id+","+mysql.escape(req.body.date)+ ","+mysql.escape(req.body.out_time)+","+mysql.escape(req.body.approval_status)+","+mysql.escape(req.body.reason)+")", (err, timingResult, fields) => {
                res.send(timingResult) 
                    
            })
        }


    })

}

module.exports=addTiming