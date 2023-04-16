const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const addSalary = async() => {
  await  database.query("select * from employees left join job_details on job_details.id=employees.job_details_id",async(err,employeesResult,fields)=>{
        let employee_id_array=employeesResult.map((data)=>{
            let obj={}
            obj.id=data.id,
            obj.role_id=data.role_id
            return obj
        })
        
       await employee_id_array.forEach(async(element) => {
          await  database.query("select count (id) as id_count from attendance where employee_id="+element.id+" and status='Present'",(err,attendanceCountResult,fields)=>{
                
            database.query("select amount from base_salaries where role_id="+element.role_id,(err,baserSalariesResult,fields)=>{
                database.query("select sum(amount) from advance where employee_id="+element.id,(err,advanceResult,fields)=>{
                    database.query("select sum(amount) from advance where employee_id="+element.id,(err,advanceResult,fields)=>{
                
                let computed=attendanceCountResult*baserSalariesResult[0].amount/(moment().daysInMonth())
                database.query("Insert into salaries (employee_id,days,month,computed,food_allowance,other,advance,advance_emi) values()="+element.role_id,(err,baserSalariesResult,fields)=>{
                
                }) 
            })
            })  
            })
               
            })  

        });
        
        
    })

}

module.exports=addSalary