const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const updateTimingByFiByGuard = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select timer from timing where id="+req.params.id, (err, timingResult, fields) => {
                console.log(err)
            let in_time=moment(req.body.out_time,"hh:mm::ss").add(timingResult[0].timer)
            database.query("update timing set out_time="+mysql.escape(req.body.out_time)+" , in_time="+mysql.escape(in_time.toISOString(true))+" where id="+req.params.id, (err, timingResult, fields) => {
                console.log(err)
                res.send(timingResult) 
                    
            })
        })
        }


    })

}

module.exports=updateTimingByFiByGuard