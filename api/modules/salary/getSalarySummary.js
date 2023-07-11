const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const getSalarySummary = async ( req,res,next) => {
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
database.query("select * from attendance  where attendance.employee_id="+req.query.employee_id+" and attendance.check_in_datetime>=" + mysql.escape(req.query.from_date) + " and attendance.check_in_datetime< " +mysql.escape(req.query.to_date),(err,salary)=>{
    database.query("select * from fines  where fines.employee_id="+req.query.employee_id+" and fines.date>=" + mysql.escape(req.query.from_date) + " and fines.date< " +mysql.escape(req.query.to_date),(err,fine)=>{  
        salary.forEach((salaryData)=>{
            salaryData.amount=0
        fine.forEach((fineData)=>{
           
                console.log(fineData.date)
                let fineDate=fineData.date.toString().split("T")[0]
                let salaryDate=salaryData.check_in_datetime.toString().split(" ")[0]
                if(fineDate===salaryDate){
                
                    salaryData.amount=fineData.amount
                }
            })


        })
        console.log(salary)
    res.send(salary)
    console.log(salary)
})
})
        }
    })
    })
   


}

module.exports = getSalarySummary