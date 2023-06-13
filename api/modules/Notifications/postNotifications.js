const moment = require("moment/moment");
const database = require("../../../config/database");
const mysql = require("mysql")
const postNotifications = (req, res, next) => {
    const role_id = req.body.result.role_id
    
            database.query("insert into notifications (name,date,time) values("+mysql.escape(req.body.text)+","+mysql.escape(req.body.date)+","+mysql.escape(req.body.time)+")", (err, notifications, fields) => {
                res.send(notifications) 
                    
            })
       

}

module.exports=postNotifications