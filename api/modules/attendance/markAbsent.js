const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const markAbsent = () => {
    let date=new Date()
let today=moment([date.getFullYear(),date.getMonth(),date.getDate()])

database.query("select employee_id from attendance where check_in_datetime>="+mysql.escape(today.toISOString(true))+" and check_in_datetime<"+mysql.escape(today.add(1,"days").toISOString(true)),(err,attendanceResult,fields)=>{
    let leaveEmployees=attendanceResult.map((data)=>{
        return data.employee_id
    })
    database.query("select id from employees",(err,employeeIds)=>{
        employeeIds=employeeIds.filter((data)=>{
            return !leaveEmployees.includes(data.id)
        })
        employeeIds.forEach(element => {
           database.query("Insert into attendance (check_in_datetime,employee_id,status) values("+mysql.escape(moment([date.getFullYear(),date.getMonth(),date.getDate()]).toISOString(true))+","+element.id+",'absent')",(err,attendanceInsertResult)=>{
            console.log(attendanceInsertResult)
           }) 
        });
    })
})

}
module.exports=markAbsent