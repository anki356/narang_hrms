var moment = require('moment-timezone');
const database = require("../../../config/database");
const mysql = require("mysql")
const getNotifications = (req, res, next) => {
    const role_id = req.body.result.role_id
    
            database.query("select * from notifications where date="+mysql.escape(moment().format("YYYY-MM-DD"))+" and time>="+mysql.escape(moment().tz("Asia/Calcutta").format("HH:mm:ss")), (err, notifications, fields) => {
               console.log("select * from notifications where date<="+mysql.escape(moment().format("YYYY-MM-DD"))+" and time>="+mysql.escape(moment().tz("Asia/Calcutta").format("HH:mm:ss")));
                console.log("notifications",notifications)
                res.send(notifications) 
                    
            })
       

}

module.exports=getNotifications