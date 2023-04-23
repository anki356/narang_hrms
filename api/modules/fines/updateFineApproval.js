const database = require("../../../config/database");

const mysql=require('mysql')
const updateFineApproval = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Update fines set status= "+mysql.escape(req.body.status)+", status_by_id="+role_id+",rejection_reason="+mysql.escape(req.body.rejection_reason)+" , status_date=current_timestamp() where id="+req.params.id , (err, fineData, fields) => {
                console.log(err)
                res.send(fineData) 
                    
            })
        }


    })

}

module.exports=updateFineApproval