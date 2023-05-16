const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalInterviews = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','HR Assistant','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="select count (id) as count_id from interview where date_time>="+mysql.escape(req.query.from_date)+" and date_time<="+mysql.escape(req.query.to_date)
            if(req.query.status){
                queryString+=" and interview.status = "+req.query.status
              
               }
            database.query(queryString, (err, interview, fields) => {
                console.log(err)
                res.send(interview) 
                    
            })
        }



    })

}

module.exports=getTotalInterviews