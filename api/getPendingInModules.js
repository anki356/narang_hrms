const database = require("../config/database");
const moment=require("moment")
const mysql = require("mysql")
const getPendingInModules = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            if(req.query.table_name!=='automated_grades'&&req.query.table_name!=='attendance_approval'&&req.query.table_name!=='timing_approval' )  
           {
         database.query("select count(distinct id) as count_id from "+req.query.table_name+"left join employees on employees.id="+req.query.table_name+".id where "+req.query.table_name+".status='Pending'", (err, result, fields) => {
             res.send(result) 
                 
         })
        }
        else if(req.query.table_name==='automated_grades'){
            let from_date=moment().startOf('week')
            let to_date=moment().endOf('week').add(1,'d')
            database.query("select count(distinct id) as count_id from "+req.query.table_name+" left join employees on employees.id="+req.query.table_name+".id left join job_details on job_details.id=employees.job_details_id  where date>="+mysql.escape(from_date)+" and date<="+mysql.escape(to_date)+" and role_id != 8 and employees.status=1"  , (err, result, fields) => {
                res.send(result) 
                    
            })
        }
        else if(req.query.table_name==='attendance_approvals'||req.query.table_name==='timing_approvals'){
            
        }
        }
    })

}

module.exports=getPendingInModules