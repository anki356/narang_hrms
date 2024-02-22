const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const getTimingCorrectionRequests = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select timing_requests.*,timing.* from timing_requests left join timing on timing.id=timing_requests.timing_id where timing_requests.status='Pending'", (err, timingRequestResult, fields) => {
console.log(err)
                res.send(timingRequestResult) 
                    
            })
        }


    })

}

module.exports=getTimingCorrectionRequests