const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const getCountSalary = async ( req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Salary'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
            let queryString="select count(distinct salaries.employee_id) as count_id  from salaries left join employees on employees.id =salaries.employee_id where month="+req.query.month +" and employees.status=1"
            if(req.query.status){
                queryString+=" and salaries.status="+req.query.status
            }
if(req.query.sub_type){
    queryString+=" and employees.sub_type="+req.query.sub_type
}
database.query(queryString,(err,salary)=>{
    console.log(err)
    res.send(salary)
})

        }
    })
    })
   


}

module.exports = getCountSalary