var moment = require('moment-timezone');
const database = require("../../../config/database");
const mysql = require("mysql")
const getNotifications = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin','Guard','HR Head','HR Assistant','Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="select * from notifications where date>="+mysql.escape(moment().tz("Asia/Calcutta").format("YYYY-MM-DD"))+" and time>="+mysql.escape(moment().tz("Asia/Calcutta").format("HH:mm:ss"))+" and is_active=1"
           if(req.query.id){
            "and id="+req.query.id
           }
            database.query(queryString, (err, notifications, fields) => {
               console.log("select * from notifications where date>="+mysql.escape(moment().format("YYYY-MM-DD"))+" and time>="+mysql.escape(moment().tz("Asia/Calcutta").format("HH:mm:ss")));
                console.log("notifications",notifications)
                res.send(notifications) 
                    
            })
       
        }
    })
}

module.exports=getNotifications