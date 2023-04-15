const database = require("../../../config/database");
const getLeaves = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo, leaves.*,employees.name ,employees.employee_id as empID, floors.name as floor_name,roles.role_name,store_departments.name as department_name,roles.role_name,stores.name as store_name from leaves left join employees on employees.id=leaves.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join roles on job_details.role_id=roles.id left join store_departments on job_details.store_department_id=store_departments.id left join file_upload on file_upload.id=employees.photo_id left join stores on stores.id=job_details.store_id  where leaves.date>="+req.query.from_date +"and leaves.date<"+req.query.to_date
             if(req.query.floor_name){
                queryString+=" and floors.name=" +req.query.floor_name
               }
               if(req.query.approval_status){
                queryString+=" and leaves.approval_status=" +req.query.approval_status
               }
               if(req.query.store_name){
                queryString+=" and stores.name="+ req.query.store_name
               }
               if(req.query.role_name){
                queryString+=" and roles.role_name="+ req.query.role_name
               }
               if(req.query.employee_id){
                queryString+="and employees.employee_id="+ req.query.employee_id
               }
               if (req.query.employee_name){
                queryString+="and employees.name like '%'"+ req.query.employee_name+"'%'"
               }
                database.query(queryString ,(err, leavesData, fields) => {
                res.send(leavesData) 
                    
            })
        }



    })

}

module.exports=getLeaves