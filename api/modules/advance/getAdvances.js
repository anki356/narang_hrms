const database = require("../../../config/database");

const mysql=require('mysql')
const getAdvances = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo, advance.*,employees.name as employee_name ,roles.role_name as role_name,employees.employee_id as empID, floors.name as floor_name from advance left join employees on employees.id=advance.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id =job_details.floor_id left join stores on stores.id=job_details.store_id left join roles on roles.id=job_details.role_id left join file_upload on file_upload.id=employees.photo_id where date>="+mysql.escape(req.query.from_date)+"and date<"+mysql.escape(req.query.to_date)
            if(req.query.floor_name){
                queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
               }
               if(req.query.store_name){
                queryString+=" and stores.name="+ mysql.escape(req.query.store_name)
               }
               if(req.query.role_name){
                queryString+=" and roles.role_name="+mysql.escape(req.query.role_name)
               }
               if(req.query.status){
                queryString+=" and advance.status in ("+ req.query.status+")"
               }
               if(req.query.employee_query){
                queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
               }
               if(req.query.limit){
                queryString+=" limit "+req.query.limit
               }
               if(req.query.offset){
                queryString+=" Offset "+req.query.offset
               }
            
            database.query(queryString , (err, advanceData, fields) => {
                console.log(err);
                res.send(advanceData) 
                    
            })
        }



    })

}

module.exports=getAdvances