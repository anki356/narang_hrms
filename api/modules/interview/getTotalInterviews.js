const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalInterviews = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Interview'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
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

    })

}

module.exports=getTotalInterviews