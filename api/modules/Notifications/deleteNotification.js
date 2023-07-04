var moment = require('moment-timezone');
const database = require("../../../config/database");
const mysql = require("mysql")
const deleteNotification = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("update notifications set is_active=0 where id="+req.params.id, (err, notifications, fields) => {
               
                console.log("notifications",notifications)
                res.send(notifications) 
                    
            })
       
        }
    })
}

module.exports=deleteNotification