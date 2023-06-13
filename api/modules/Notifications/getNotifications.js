const moment = require("moment/moment");
const database = require("../../../config/database");
const mysql = require("mysql")
const getNotifications = (req, res, next) => {
    const role_id = req.body.result.role_id
    
            database.query("select * from notifications where date<="+moment().format("DD-MM-YYYY")+" and time<="+moment().format("HH:mm:ss"), (err, notifications, fields) => {
                res.send(notifications) 
                    
            })
       

}

module.exports=getNotifications