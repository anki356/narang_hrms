const database = require("../../../config/database");
const moment=require('moment')

const mysql = require("mysql")
const getExpenses = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant','Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT expenses.*, file_upload.name as photo,locations.name as location_name, floors.name as floor_name, expenses.status,expenses_categories.name as category_name,expenses_sub_categories.name as sub_category_name, expenses.status_date,employees.name as employee_name,employees.employee_id as empID FROM expenses LEFT JOIN expenses_categories ON expenses_categories.id=expenses.category_id LEFT JOIN employees ON employees.id=expenses.employee_id LEFT JOIN expenses_sub_categories ON expenses_sub_categories.id=expenses.sub_category_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id left join roles on roles.id=job_details.role_id left join locations on locations.id=job_details.location_id where locations.name="+ mysql.escape(req.query.location_name)
            if(result[0].role_name.split(" ")[0]==='Floor'){
                database.query("select id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id
                    if(req.query.floor_name){
                        queryString+=" and floors.name=" + mysql.escape(req.query.floor_name)
                       }
                    if(req.query.category_name){
                        queryString+=" and expenses_categories.name=" + mysql.escape(req.query.category_name)
                       }
                       if(req.query.from_date && req.query.to_date){
                        queryString+=" and date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)
                       }
                       
                      
                       if(req.query.role_name){
                        queryString+=" and roles.role_name="+ req.query.role_name
                       }
                 
                   if(req.query.employee_query){
                    queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
                   }
                   if(req.query.status){
                    queryString+=" and expenses.status="+ req.query.status
                   }
                   if(req.query.limit){
                    queryString+=" limit "+req.query.limit
                   }
                   if(req.query.offset){
                    queryString+=" Offset "+req.query.offset
                   }
                    database.query(queryString , (err, expenseData, fields) => {
                        console.log(err)
                        res.send(expenseData) 
                            
                    })

                })
                
               }else{
                if(req.query.floor_name){
                    queryString+=" and floors.name=" + mysql.escape(req.query.floor_name)
                   }
                  
                   if(req.query.role_name){
                    queryString+=" and roles.role_name="+ mysql.escape(req.query.role_name) 
                   }
                   if(req.query.category_name){
                    queryString+=" and expenses_categories.name=" + mysql.escape(req.query.category_name)
                   }
               if(req.query.employee_query){
                queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
               }
               if(req.query.status){
                queryString+=" and expenses.status="+ req.query.status
               }
               if(req.query.from_date && req.query.to_date){
                queryString+=" and date>="+mysql.escape(req.query.from_date)+" and date<"+mysql.escape(req.query.to_date)
               }
               if(req.query.limit){
                queryString+=" limit "+req.query.limit
               }
               if(req.query.offset){
                queryString+=" Offset "+req.query.offset
               }
                database.query(queryString , (err, expenseData, fields) => {
                    console.log(err)
                    res.send(expenseData) 
                        
                })

               }
              
        }


    })

}

module.exports=getExpenses