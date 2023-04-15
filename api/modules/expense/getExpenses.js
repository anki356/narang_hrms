const database = require("../../../config/database");
const getExpenses = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT file_upload.name as photo, floors.name as floor_name, expenses.status,expenses_categories.name as category_name,expenses_sub_categories.name as sub_category_name, expenses.approval_date,employees.name,employees.employee_id FROM expenses LEFT JOIN expenses_categories ON expenses_categories.id=expenses.category_id LEFT JOIN employees ON employees.id=expenses.employee_id LEFT JOIN expenses_sub_categories ON expenses_sub_categories.id=expenses.sub_category_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id left join roles on roles.id=job_details.role_id where date>="+req.query.from_date+"and date<"+req.query.to_date
            if(result[0].role_name.split(" ")[0]==='Floor Incharge'){
                database.query("select id from employees left join job_details on job_details.id=employees.job_details_id where job_details.role_id="+role_id,(err,employeesResult,fields)=>{
                    queryString+=" and job_details.head_employee_id=" +employeesResult[0].id
                })
                
               }
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
            queryString+="and employees.employee_id="+ req.query.employee_id
           }
           if (req.query.employee_name){
            queryString+="and employees.name like '%'"+ req.query.employee_name+"'%'"
           }
            database.query(queryString , (err, expenseData, fields) => {
                res.send(expenseData) 
                    
            })
        }


    })

}

module.exports=getExpenses