
const database = require("../../../config/database");
const getTimings = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Floor Incharge','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo, employees.id as employees_id,employees.name,employees.employee_id as empID,timing.* from timing left join employees on employees.id=timing.employee_id left join file_upload on file_upload.id=employees.photo_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id =job_details.floor_id left join stores on stores.id=job_details.store_id left join roles on roles.id=job_details.role_id where timing.date>="+req.query.from_date+"and timing.date<"+req.query.to_date
            if(req.query.floor_name){
                queryString+=" and floors.name=" +req.query.floor_name
               }
               
               if(req.query.store_name){
                queryString+=" and stores.name="+ req.query.store_name
               }
               if(req.query.role_name){
                queryString+=" and roles.role_name="+ req.query.role_name
               }
               if(req.query.employee_id){
                queryString+=" and employees.employee_id="+ req.query.employee_id
               }
               if (req.query.employee_name){
                queryString+=" and employees.name like '%'"+ req.query.employee_name+"'%'"
               }
               if (req.query.approval_status){
                queryString+=" and timing.approval_status ="+ req.query.approval_status
               }
            database.query( queryString, (err, timingResult, fields) => {
                console.log(err)
                res.send(timingResult) 
                    
            })
        }


    })

}

module.exports=getTimings