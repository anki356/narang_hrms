const moment = require("moment/moment");
const database = require("../../../config/database");
const mysql = require("mysql")
const postNotifications = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("insert into notifications (name,date,time,text) values("+mysql.escape(req.body.title)+","+mysql.escape(req.body.date)+","+mysql.escape(req.body.time)+","+mysql.escape(req.body.detail)+")", (err, notifications, fields) => {

                console.log(err);
                res.send(notifications) 
                    
            })
       
        }
    })
}

module.exports=postNotifications