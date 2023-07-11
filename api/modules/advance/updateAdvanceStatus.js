const database = require("../../../config/database");
const mysql=require('mysql')
const updateAdvanceStatus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin','Super Admin','HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            
            database.query("update advance set status = "+mysql.escape(req.body.status)+", status_date=current_timestamp() , status_id="+role_id+",rejection_reason="+mysql.escape(req.body.rejection_reason)+" where id="+req.params.id , (err, advanceData, fields) => {
              
                res.send(advanceData) 
                    
            })
        
        }



    })

}

module.exports=updateAdvanceStatus