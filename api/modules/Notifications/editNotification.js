var moment = require('moment-timezone');
const database = require("../../../config/database");
const mysql = require("mysql")
const editNotification = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("update notifications set name="+mysql.escape(req.body.title)+", text="+mysql.escape(req.body.detail)+" where id="+req.params.id, (err, notifications, fields) => {
               
                console.log("notifications",notifications,err)
                res.send(notifications) 
                    
            })
       
        }
    })
}

module.exports=editNotification