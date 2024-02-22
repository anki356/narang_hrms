const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const markAttendance=async()=>{
       
    let date=new Date()
let today=moment([date.getFullYear(),date.getMonth(),date.getDate()])

database.query("select employee_id from attendance where check_in_datetime>="+mysql.escape(today.toISOString(true))+" and check_in_datetime<"+mysql.escape(today.add(1,"days").toISOString(true))+" and status="+mysql.escape('On Leave'),(err,attendanceResult,fields)=>{
    console.log(err)
    let leaveEmployees=attendanceResult.map((data)=>{
        return data.employee_id
    })
    database.query("select id from employees where status=1",(err,employeeIds)=>{
        employeeIds=employeeIds.filter((data)=>{
            return !leaveEmployees.includes(data.id)
        })
        const dayArray=['Sunday','Monday','TuesDay','Wednesday','Thursday','Friday','Saturday']
        let todayDay=dayArray[moment().day()]
     
    //   todayDay=dayArray[today.day()]
        database.query("select weekoffs.employee_id from weekoffs  left join employees on employees.id=weekoffs.employee_id where week_off="+mysql.escape(todayDay)+" and employees.status="+1,(err,workingEmployeeResult)=>{
            console.log(err)
            workingEmployeeResult=workingEmployeeResult.map((data)=>data.employee_id)
            
            employeeIds=employeeIds.filter((data)=>{
    return !workingEmployeeResult.includes(data.id)
})
workingEmployeeResult=workingEmployeeResult.filter((data)=>{
    return !leaveEmployees.includes(data)
})
 console.log("workingEmployeeResult", workingEmployeeResult)

workingEmployeeResult.forEach((data)=>{
    database.query("Insert into attendance (check_in_datetime,employee_id,status,no_of_shifts) values("+mysql.escape(moment([date.getFullYear(),date.getMonth()-1,date.getDate()-2]).toISOString(true))+","+data+",'WeekOff',1)",(err,attendanceInsertResult)=>{
       
        console.log(attendanceInsertResult)
    }) 
})
             

                employeeIds.forEach(element => {
                database.query("Insert into attendance (check_in_datetime,employee_id,status,no_of_shifts) values("+mysql.escape(moment([date.getFullYear(),date.getMonth(),date.getDate()]).toISOString(true))+","+element.id+",'absent',0)",(err,attendanceInsertResult)=>{
                    console.log(attendanceInsertResult)
                  }) 
                
               
          
        });
         database.query("Insert into cron_job_timestamps (name,timestamp) values('mark_absent',"+mysql.escape(moment([date.getFullYear(),date.getMonth(),date.getDate()]).toISOString(true))+")",(err,result)=>{
                    console.log(result)
                })
    })
    })
})
}
const markAbsent =async () => {
    try{
     await markAttendance()   
 
}catch(error){
    if(error){
      await markAttendance()  
    }
}
}
module.exports=markAbsent