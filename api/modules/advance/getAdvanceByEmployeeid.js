const database = require("../../../config/database");
const getAdvanceByEmployeeid = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT advance.*,employees.name,employees.employee_id as empID,floors.name as floor_name from advance left join employees on employees.id=advance.employee_idleft join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id where employees.employee_id="+req.query.employee_id , (err, advanceData, fields) => {
                res.send(advanceData) 
                    
            })
        }



    })

}

module.exports=getAdvanceByEmployeeid