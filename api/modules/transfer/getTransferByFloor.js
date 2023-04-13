const database = require("../../../config/database");
const getTransferByFloor = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT transfer_details.*, floors.name as floor_name,employees.name as employee_name, employees.employee_id as empID from transfer_details left join employees on employees.id=transfer_details.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id where date>="+req.query.from_date +"and date<"+req.query.to_date+" and floors.name="+req.query.floor_name, (err, transferResult, fields) => {
                res.send(transferResult) 
                    
            })
        }


    })

}

module.exports=getTransferByFloor