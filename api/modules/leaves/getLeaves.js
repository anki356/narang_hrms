const database = require("../../../config/database");
const getLeaves = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT file_upload.name as photo, leaves.*,employees.name ,employees.employee_id as empID, floors.name as floor_name,roles.role_name,store_departments.name as department_name from leaves left join employees on employees.id=leaves.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join roles on job_details.role_id=roles.id left join store_departments on job_details.store_department_id=store_departments.id left join file_upload on file_upload.id=employees.photo_id where leaves.date>="+req.query.from_date +"and leaves.date<"+req.query.to_date, (err, leavesData, fields) => {
                console.log(err)
                res.send(leavesData) 
                    
            })
        }



    })

}

module.exports=getLeaves