const database = require("../../../config/database");
const mysql=require('mysql')
const getTransferByEmployeeName = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT file_upload.name as photo,transfer_details.*, employees.name as employee_name, employees.employee_id as empID from transfer_details left join employees on employees.id=transfer_details.employee_id left join file_upload on file_upload.id=employees.photo_id where date>="+req.query.from_date +"and date<"+req.query.to_date+" and employees.name="+req.query.employee_name, (err, transferResult, fields) => {
                res.send(transferResult) 
                    
            })
        }


    })

}

module.exports=getTransferByEmployeeName