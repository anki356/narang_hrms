const database = require("../../../config/database");
const getLeavesByStatus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT leaves.*,employees.name ,employees.employee_id as empID, floors.name as floor_name,roles.role_name,departments.name as department_name from leaves left join employees on employees.id=leaves.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join roles on job_details.role_id=roles.id left join departments on roles.department_id=departments.id where leaves.date>="+req.query.from_date +"and leaves.date<"+req.query.to_date+"and leaves.approval_status="+req.query.approval_status, (err, leavesData, fields) => {
                console.log(err)
                res.send(leavesData) 
                    
            })
        }



    })

}

module.exports=getLeavesByStatus