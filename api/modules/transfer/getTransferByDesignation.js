const database = require("../../../config/database");
const mysql=require('mysql')
const getTransferByDesignation = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT transfer_details.*,roles.role_name,employees.name as employee_name,employees.employee_id as empID from transfer_details left join employees on employees.id=transfer_details.employee_id left join job_details on job_details.id=employees.job_details_id left join roles on roles.id=job_details.role_id where date>="+req.query.from_date +"and date<"+req.query.to_date +" and roles.role_name="+req.query.role_name, (err, transferResult, fields) => {
                  res.send(transferResult)  
            })
        }


    })

}

module.exports=getTransferByDesignation