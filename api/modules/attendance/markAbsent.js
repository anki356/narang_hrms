const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const markAbsent = () => {
    let date=new Date()
let today=moment([date.getFullYear(),date.getMonth(),date.getDate()])

database.query("select employee_id from attendance where check_in_datetime>="+mysql.escape(today.toISOString(true))+" and check_in_datetime<"+mysql.escape(today.add(1,"days").toISOString(true)),(err,attendanceResult,fields)=>{
    console.log(err)
    let leaveEmployees=attendanceResult.map((data)=>{
        return data.employee_id
    })
    database.query("select id from employees where status=1",(err,employeeIds)=>{
        employeeIds=employeeIds.filter((data)=>{
            return !leaveEmployees.includes(data.id)
        })
        const dayArray=['Sunday','Monday','TuesDay','Wednesday','Thursday','Friday','Saturday']
        let today=dayArray[moment().day()]
        database.query("select employee_id from weekoffs where week_off="+mysql.escape(today),(err,workingEmployeeResult)=>{
            workingEmployeeResult=workingEmployeeResult.map((data)=>data.employee_id)
            
            employeeIds=employeeIds.filter((data)=>{
    return !workingEmployeeResult.includes(data.id)
})
workingEmployeeResult=workingEmployeeResult.filter((data)=>{
    return !leaveEmployees.includes(data)
})
workingEmployeeResult.forEach((data)=>{
    database.query("Insert into attendance (check_in_datetime,employee_id,status) values("+mysql.escape(moment([date.getFullYear(),date.getMonth(),date.getDate()]).toISOString(true))+","+data+",'WeekOff')",(err,attendanceInsertResult)=>{
        console.log(attendanceInsertResult)
    }) 
})
             

                employeeIds.forEach(element => {
                database.query("Insert into attendance (check_in_datetime,employee_id,status) values("+mysql.escape(moment([date.getFullYear(),date.getMonth(),date.getDate()]).toISOString(true))+","+element.id+",'absent')",(err,attendanceInsertResult)=>{
                    console.log(attendanceInsertResult)
                   }) 
                
               
          
        });
    })
    })
})

}
module.exports=markAbsent