const database = require("../../../config/database");
const mysql=require('mysql')
const getBonus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            
                let queryString="select bonus.*, employees.name as employee_name,employees.employee_id as empID from bonus left join employees on employees.id=bonus.employee_id left join job_details on job_details.id=employees.job_details_id left JOIN floors ON job_details.floor_id=floors.id left join roles on job_details.role_id=roles.id left join file_upload on file_upload.id=employees.photo_id left join locations on locations.id=job_details.location_id where locations.name="+ mysql.escape(req.query.location_name) +" and employees.status=1"  
       
     
                if(req.query.floor_name){
                    queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
                   }
                   if(req.query.location_name){
                    queryString+=" and locations.name="+ mysql.escape(req.query.location_name)
                   }
                   if(req.query.role_name){
                    queryString+=" and roles.role_name="+ mysql.escape(req.query.role_name)
                   }
                   if(req.query.from_date && req.query.to_date){
                    queryString+=" and bonus.created_on>="+mysql.escape(req.query.from_date)+" and bonus.created_on<"+mysql.escape(req.query.to_date)
                   }
                   if(req.query.employee_query){
                    queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
                   }
                   if(req.query.status){
                    queryString+=" and attendance.status in ("+ req.query.status+")"
                   }
                   if(req.query.employee_id){
                    queryString+=" and attendance.employee_id = "+req.query.employee_id
                  
                   }
                   if(req.query.limit){
                    queryString+=" limit "+req.query.limit
                   }
                   if(req.query.offset){
                    queryString+=" Offset "+req.query.offset
                  
                   }
                  
                   database.query(queryString , (err, bonusResult, fields) => {
                    console.log(err)
                    if(bonusResult.length>0){
                        let employeeIds=bonusResult.map((data)=>data.employee_id)
                        database.query("select * from base_salaries where employee_id in ("+employeeIds+")", (err, baseSalariesData, fields) => {
                        console.log(err)
                        res.json({"bonusResult":bonusResult,"baseSalariesData":baseSalariesData}) 
                    })
                    }
                    else{
                        res.json({"bonusResult":bonusResult}) 
                    }
                    
            })
            
               
        
        }


    })

}

module.exports=getBonus