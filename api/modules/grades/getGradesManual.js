const database = require("../../../config/database");
const mysql = require("mysql")
const getGrades = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo, grades.*,roles.role_name as role_name,employees.name as employee_name ,employees.employee_id as empID, floors.name as floor_name from grades left join employees on employees.id=grades.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id left join roles on job_details.role_id=roles.id left join locations on job_details.location_id=locations.id where grades.date>="+mysql.escape(req.query.from_date)+" and grades.date<= "+mysql.escape(req.query.to_date) +" and employees.status=1" 
            if(req.query.floor_name){
                queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
               }
               if(req.query.location_name){
                queryString+=" and locations.name="+ mysql.escape(req.query.location_name)
               }
               if(req.query.role_name){
                queryString+=" and roles.role_name= "+mysql.escape(req.query.role_name)
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
                database.query(queryString , (err, gradesData, fields) => {
                    console.log(queryString);
                res.send(gradesData) 
                    
            })
        }


    })

}

module.exports=getGrades