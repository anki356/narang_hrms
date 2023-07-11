
const database = require("../../../config/database");
const mysql=require('mysql')
const getTotalOutSessions = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Guard','Floor Incharge','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT count(timing.id) as count_id from timing left join employees on employees.id=timing.employee_id left join job_details on job_details.id=employees.job_details_id where date>= "+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date) +" and timing.in_time is null and out_time is not null" +" and employees.status=1"
            if(result[0].role_name.split(" ")[0]==='Floor'){
                database.query("select employees.id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    console.log(err)
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id  
            if(req.query.out_time_from){
                queryString+=" and out_time>="+mysql.escape(req.query.out_time_from)+"and out_time<"+mysql.escape(req.query.out_time_to)
            }
            if(req.query.status_id){
                queryString+=" and status_id in ("+req.query.status_id+")"
            }
            database.query( queryString, (err, timingResult, fields) => {
                console.log(err)
                res.send(timingResult) 
                    
            })
        })
    }
    else{
        if(req.query.out_time_from){
            queryString+=" and out_time>="+mysql.escape(req.query.out_time_from)+"and out_time<"+mysql.escape(req.query.out_time_to)
        }
        if(req.query.status_id){
            queryString+=" and status_id in ("+req.query.status_id+")"
        }
        database.query( queryString, (err, timingResult, fields) => {
            console.log(err)
            res.send(timingResult) 
                
        })

    }
        }


    })

}

module.exports=getTotalOutSessions