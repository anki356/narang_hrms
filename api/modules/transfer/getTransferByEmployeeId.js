const database = require("../../../config/database");
const getTransferByEmployeeId = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT transfer_details.*,employees.name as employee_name,employees.employee_id as empID from transfer_details left join employees on employees.id=transfer_details.employee_id where date>="+req.query.from_date +"and date<"+req.query.to_date+"and employees.employee_id="+req.query.employee_id, (err, transferResult, fields) => {
                res.send(transferResult) 
                    
            })
        }


    })

}

module.exports=getTransferByEmployeeId