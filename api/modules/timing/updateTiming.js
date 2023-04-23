const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const updateTiming= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            
                database.query("Update timing set in_time="+mysql.escape(req.body.in_time)+",timer="+mysql.escape(req.body.timer)+", modified_date_time=current_timestamp() where id="+req.params.id, (err, timingResult, fields) => {
                    res.send(timingResult) 
                        
                })
        
          
        }


    })

}

module.exports=updateTiming