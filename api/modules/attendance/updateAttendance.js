const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const updateAttendance= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            if(req.body.approval_status==='Approved'){
                if(req.body.file){

                    database.query("Insert into file_upload (type,name) values ('attendance_image',"+mysql.escape(req.body.file)+")",(err,fileResult,fields)=>{ 
                       
                        database.query("Update attendance_requests set status="+mysql.escape(req.body.approval_status)+",date_time="+mysql.escape(req.body.date_time)+" where id="+req.params.id, (err, attendanceRequestResult, fields) => {
                           console.log(err)
                           
                            database.query("Update attendance set check_in_datetime="+mysql.escape(req.body.date_time)+",status="+mysql.escape(req.body.status)+",approval_document_id="+fileResult.insertId+", status_by_id ="+ role_id+",status_date=current_timestamp(),no_of_shifts="+req.body.no_of_shifts+" where id= "+req.body.attendance_id, (err, attendanceResult, fields) => {
                                console.log(err)
                                if(req.body.reason==='By Mistake'){
                                    let today=moment(req.body.date_time)
                    let date=today.date()
                    let month=today.month()
                    let year=today.year()
                    let break_point=moment().set('year',year).set('month',month).set('date',date).set('hour',10).set('minute',40).set('second',0)
                    let fine=moment(req.body.date_time).diff(break_point,'minutes')
                    console.log('fine',fine,"break_point",break_point)
                    fine=Number(fine)+Number(1)
                    if(fine>0){
                     
                      
                        database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status,status_date) values ("+req.body.employee_id+","+fine+",'Late Coming', current_timestamp(),1,1,'Approved','Unpaid',current_timestamp() )",(err,fineResult)=>{
                            
                            
                            res.json({"attendanceResult":attendanceResult,"attendanceRequestResult":attendanceRequestResult,"fineResult":fineResult})
                        })
                    }
                    else{
                        res.json({"attendanceResult":attendanceResult,"attendanceRequestResult":attendanceRequestResult})
                    }
                                }
                                else{
                                    res.json({"attendanceResult":attendanceResult,"attendanceRequestResult":attendanceRequestResult})
                                }
                                 
                                    
                            })
                        })
                    })
                }
                else{
                    database.query("Update attendance_requests set status="+mysql.escape(req.body.approval_status)+" where id="+req.params.id, (err, attendanceRequestResult, fields) => {
                        console.log(err)
                        
                         database.query("Update attendance set check_in_datetime="+mysql.escape(req.body.date_time)+",status="+mysql.escape(req.body.status)+", status_by_id ="+ role_id+",status_date=current_timestamp(),no_of_shifts="+req.body.no_of_shifts+" where id= "+req.body.attendance_id, (err, attendanceResult, fields) => {
                             console.log(err)
                             
                             if(req.body.reason==='By Mistake'){
                                let today=moment(req.body.date_time)
                let date=today.date()
                let month=today.month()
                let year=today.year()
                let break_point=moment().set('year',year).set('month',month).set('date',date).set('hour',10).set('minute',40).set('second',0)
                let fine=moment(req.body.date_time).diff(break_point,'minutes')
                console.log('fine',fine,"break_point",break_point)
                fine=Number(fine)+Number(1)
                if(fine>0){
                 
                    
                    database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status,status_date) values ("+req.body.employee_id+","+fine+",'Late Coming', current_timestamp(),1,1,'Approved','Unpaid',current_timestamp() )",(err,fineResult)=>{
                        
                        
                        res.json({"attendanceResult":attendanceResult,"attendanceRequestResult":attendanceRequestResult,"fineResult":fineResult})
                    })
                }
                else{
                    res.json({"attendanceResult":attendanceResult,"attendanceRequestResult":attendanceRequestResult})
                }
                            }
                            else{
                                res.json({"attendanceResult":attendanceResult,"attendanceRequestResult":attendanceRequestResult})
                            }   
                         })
                     })
                }
                }   
                else{
                    database.query("Update attendance_requests set status="+mysql.escape(req.body.approval_status)+" where id="+req.params.id, (err, attendanceRequestResult, fields) => {
                        console.log(err)
                    database.query("Update attendance set status='Absent' , status_by_id ="+ role_id+",status_date=current_timestamp() where id= "+req.body.attendance_id, (err, attendanceResult, fields) => {
                        console.log(err)
                        res.json({"attendanceResult":attendanceResult,"attendanceRequestResult":attendanceRequestResult}) 
                            
                    })
                })

                } 
               
            
            
               
        
          
        }


    })

}

module.exports=updateAttendance