
const database = require("../../../config/database");
const getInterview = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT roles.role_name,interview.* from interview left join employees on employees.id=interview.interviewer_employee_id left join job_details on job_details.id=employees.job_details_id left join floors on job_details.floor_id=floors.id left join stores on stores.id=job_details.store_id  left join roles on roles.id=interview.designation_id where date_time>="+req.query.from_date+"and date_time<"+req.query.to_date
            if(req.query.floor_name){
                queryString+=" and floors.name=" +req.query.floor_name
               }
            if(req.query.interviewee_name){
                queryString+=" and interview.name like '%'" +req.query.interviewee_name+"'%'"
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
            database.query( queryString, (err, interviewResult, fields) => {
                console.log(err)
               
                let reference_id_employee_id_array=interviewResult.map((data)=>{
                    return data.reference_id
                })
                    
                        
                        database.query("SELECT employees.name as reference_name from employees where employees.id in ("+reference_id_employee_id_array+")" , (err, referenceIdResult, fields) => {
                            console.log(err)
res.json({"interviewResult":interviewResult,"refernceResult":referenceIdResult})
                        })
               

                
                    
        
        })
        }


    })

}

module.exports=getInterview