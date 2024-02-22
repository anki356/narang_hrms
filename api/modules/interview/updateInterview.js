const database = require("../../../config/database");
const mysql = require("mysql")
const updateInterview= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Interview'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
            database.query("Update interview set status ="+mysql.escape(req.body.status)+" where id="+req.params.id,(err,interviewResult)=>{
                console.log(err)
                res.send(interviewResult)          
                    })
            
            
            
        
          
        }

    })
    })

}

module.exports=updateInterview