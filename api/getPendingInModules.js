const database = require("../config/database");
const moment=require("moment")
const mysql = require("mysql")
const getPendingInModules = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            if(req.query.table_name!=='interview'&&req.query.table_name!=='grades'&&req.query.table_name!=='attendance_approval'&&req.query.table_name!=='timing_approval' )  
           {
         database.query("select  count(distinct "+req.query.table_name+".id) as count_id from "+req.query.table_name+" left join employees on employees.id="+req.query.table_name+".employee_id where "+req.query.table_name+".status='Pending' and employees.status=1", (err, result, fields) => {
            console.log(err)
             res.send(result) 
                 
         })
        }
        else if(req.query.table_name==='grades'){
            let from_date=moment().startOf('week')
            let to_date=moment().endOf('week').add(1,'d')
            database.query("select count(distinct "+req.query.table_name+".id) as count_id from "+req.query.table_name+" left join employees on employees.id="+req.query.table_name+".employee_id left join job_details on job_details.id=employees.job_details_id left join roles on roles.id=job_details.role_id  where  roles.role_name='Floor Incharge'  and date>="+mysql.escape(from_date.format("YYYY-MM-DD"))+" and date<="+mysql.escape(to_date.format("YYYY-MM-DD"))+" and role_id in(3,10,16,17) and employees.status=1"  , (err, result, fields) => {
              database.query("select count(distinct employees.id) as count_id from employees  left join job_details on job_details.id=employees.job_details_id left join roles on roles.id=job_details.role_id  where  roles.role_name='Floor Incharge' and employees.status=1"  , (err, employeesResult, fields) => { 
                console.log("grade pending",result)
        res.json({count_id:employeesResult[0]?.count_id-result[0]?.count_id})    
                    
            
                
               })
               
                    
            })
        }
        else if(req.query.table_name==='attendance_approval'){
            database.query("select count(distinct attendance_requests.id) as count_id from attendance_requests left join employees on employees.id= attendance_requests.employee_id where attendance_requests.status='Pending' and employees.status=1 and attendance_requests.type='By Mistake'", (err, result, fields) => {
                console.log(err)
                res.send(result) 
                    
            }) 
        }
         else if(req.query.table_name==='interview'){
            database.query("select count(distinct interview.id) as count_id from interview  where interview.status='Pending'", (err, result, fields) => {
                console.log(err)
                res.send(result) 
                    
            }) 
        }
        else{
            database.query("select count(distinct attendance_requests.id) as count_id from attendance_requests left join employees on employees.id= attendance_requests.employee_id where attendance_requests.status='Pending' and employees.status=1 and attendance_requests.type='Out For Some Work'", (err, result, fields) => {
                console.log(err)
                res.send(result) 
                    
            })  
        }
        }
    })

}

module.exports=getPendingInModules