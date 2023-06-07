const database = require("../../../config/database");
const moment = require('moment')
const mysql = require('mysql')
const getSalarySummary = async ( req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
database.query("select * from attendance  where attendance.employee_id="+req.query.employee_id+" and attendance.check_in_datetime>=" + mysql.escape(req.query.from_date) + " and attendance.check_in_datetime< " +mysql.escape(req.query.to_date),(err,salary)=>{
    database.query("select * from fines  where fines.employee_id="+req.query.employee_id+" and fines.date>=" + mysql.escape(req.query.from_date) + " and fines.date< " +mysql.escape(req.query.to_date),(err,fine)=>{  
        fine.forEach((fineData)=>{
            salary.forEach((salaryData)=>{
                let fineDate=fineData.date.split(" ")[0]
                let salaryDate=salaryData.check_in_datetime.split(" ")[0]
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
   


}

module.exports = getSalarySummary