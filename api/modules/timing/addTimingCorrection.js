const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const addTimingCorrection = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into timing_requests (timing_id,status) values("+req.body.timing_id+",'Pending')", (err, timingRequestResult, fields) => {
                res.send(timingRequestResult) 
                    
            })
        }


    })

}

module.exports=addTimingCorrection