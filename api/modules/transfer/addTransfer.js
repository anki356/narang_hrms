const database = require("../../../config/database");
const mysql = require("mysql")
const addTransfer = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into transfer_details (employee_id,date,department_from,department_to,floor_id_from,floor_id_to) values ("+req.body.employee_id+", current_timestamp(), "+req.body.department_from+","+req.body.department_to+","+req.body.floor_id_from+","+req.body.floor_id_to+")",(err, transferResult, fields) => {
                database.query("select job_details_id from employees where employees.id="+req.body.employee_id,(err, jobResult, fields) => {
                    console.log(jobResult)
                database.query("Update job_details set store_department_id="+req.body.department_to+",floor_id="+req.body.floor_id_to+" where job_details.id="+jobResult[0].job_details_id, (err, jobResult, fields) => {
                    console.log(err)
                    res.send(jobResult) 
                        
                })
            })
            })
        }


    })

}

module.exports=addTransfer