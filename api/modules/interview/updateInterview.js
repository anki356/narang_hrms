const database = require("../../../config/database");
const mysql = require("mysql")
const updateInterview= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Update interview set status ="+mysql.escape(req.body.status)+" where id="+req.params.id,(err,interviewResult)=>{
                console.log(err)
                res.send(interviewResult)          
                    })
            
            
            
        
          
        }


    })

}

module.exports=updateInterview