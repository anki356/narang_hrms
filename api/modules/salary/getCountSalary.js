const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const getCountSalary = async ( req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="select count(distinct salaries.employee_id) as count_id  from salaries left join employees on employees.id =salaries.employee_id where month="+req.query.month
            if(req.query.status){
                queryString+=" and status="+req.query.status
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
   


}

module.exports = getCountSalary