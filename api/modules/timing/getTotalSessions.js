
const database = require("../../../config/database");
const mysql = require("mysql")
const getTotalSessions = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Floor Incharge','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select count(distinct out_time) from timing where timing.date>="+req.query.today_date+"and timing.date<"+req.query.tommorow_date , (err, timingResult, fields) => {
                res.send(timingResult) 
                    
            })
        }


    })

}

module.exports=getTotalSessions