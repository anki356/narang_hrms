const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require ('moment')
const addAttendance= (req, res, next) => {
 
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [  'Guard']
        if (allowed_roles.includes(result[0].role_name)) {
          let today=moment()
          let timeOfAbsent=today.set('h',10).set('m',0).set('s',0)
          database.query("select id from attendance where check_in_datetime="+mysql.escape(timeOfAbsent.format("YYYY-MM-DDTHH:mm:ss"))+" and employee_id="+req.body.employee_id+" and status='Absent'",(err,attendanceAbsentResult)=>{
            
if(attendanceAbsentResult.length>0)
          {
                database.query("update attendance set check_in_datetime=current_timestamp() , status='Present',no_of_shifts=1 where id="+attendanceAbsentResult[0].id,async (err, attendanceResult, fields) => {
                    let today=new Date()
                    let date=today.getDate()
                    let month=Number(today.getMonth())+1
                    let break_point=moment().set('hour',10).set('minute',40).set('second',0)
                    let fine=moment().diff(break_point,'minutes')
                    if(fine>0){
                     
                        
                        database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status) values ("+req.body.employee_id+","+fine+",'Late Coming', current_timestamp(),1,1,'Pending','Unpaid')",(err,fineResult)=>{
                            
                            res.send(attendanceResult) 
                        })
                    
                        
                        
                    }else{
                        res.send(attendanceResult) 
                    }

                    
                        
               
            })
        }
        else{
            database.query("Insert into attendance (check_in_datetime,status,employee_id,no_of_shifts) values (current_timestamp(),'Present',"+req.body.employee_id+",2)",(err,attendanceResult)=>{
                console.log(err)
                res.send(attendanceResult)
            })
        }     
        })
          
        }
    

    })

}

module.exports=addAttendance