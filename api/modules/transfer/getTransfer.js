const database = require("../../../config/database");
const getTransfer = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo, transfer_details.*,employees.name as employee_name,employees.employee_id as empID from transfer_details left join employees on employees.id=transfer_details.employee_id left join file_upload on file_upload.id=employees.photo_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id =job_details.floor_id left join stores on stores.id=job_details.store_id left join roles on roles.id=job_details.role_id where date>="+req.query.from_date +"and date<"+req.query.to_date
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
            database.query( queryString, (err, transferResult, fields) => {
                res.send(transferResult) 
                    
            })
        }


    })

}

module.exports=getTransfer