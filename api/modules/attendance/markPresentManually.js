const database = require("../../../config/database");
const mysql = require("mysql")
const moment = require('moment')
const axios = require('axios');
const markPresentManually = (req, res, next) => {

    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = ['Super Admin','Admin','HR Head','HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            let shift
            if(moment(req.body.check_out_date).diff(req.body.check_in_date)>0){
              
                if(moment(req.body.check_out_date).set('h',0).diff(req.body.check_out_date+" "+req.body.check_out_time)<0&&moment(req.body.check_out_date).set('h',2).diff(req.body.check_out_date+" "+req.body.check_out_time)>0 ){
shift=1.5
                }
                else if (moment(req.body.check_out_date).set('h',2).diff(req.body.check_out_date+" "+req.body.check_out_time)<0&& moment(req.body.check_out_date).set('h',5).diff(req.body.check_out_date+" "+req.body.check_out_time)>0){
                   shift=2 
                }
            }
            else{
                shift=1
            }
            database.query("select id from attendance where check_in_datetime>=" + mysql.escape(req.body.check_in_date) + " and check_in_datetime<"+mysql.escape(moment(req.body.check_in_date).add(1,'d').format("YYYY-MM-DD"))+" and employee_id =" + req.body.employee_id , (err, attendanceAbsentResult) => {
                console.log(err)
                if(attendanceAbsentResult.length>0){
                    database.query("update attendance set check_in_datetime=" + mysql.escape(req.body.check_in_date+"T"+req.body.check_in_time) +" , status='Present' , no_of_shifts="+shift+"  where id =" + attendanceAbsentResult[0].id , (err, attendanceResult) => {
                        console.log("update attendance set check_in_datetime=" + mysql.escape(req.body.check_in_date+"T"+req.body.check_in_time) +" , status='Present' and no_of_shifts="+shift+"  where id =" + attendanceAbsentResult[0].id)
                      console.log(err) 
                      let today = new Date()
                      let break_point = moment(req.body.check_in_date).set('hour', 10).set('minute', 40).set('second', 0)
                      let fine = moment(req.body.check_in_date+"T"+req.body.check_in_time).diff(break_point, 'minutes')
                      fine = Number(fine) 
                      if (fine > 0) {

database.query("select * from fines where reason='Late Coming' and date="+mysql.escape(req.body.check_in_date)+"and employee_id="+req.body.employee_id,(err,fineResult)=>{
    console.log(fineResult)
if(fineResult.length>0){
database.query("update fines set amount="+Number(fine)+" where id ="+fineResult[0].id,(err,fineResult)=>{
    console.log(err)
    res.json({"attendanceResult":attendanceResult,"fineResult":fineResult})
})
}
else{
    database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status,status_date) values (" + req.body.employee_id + "," + Number(fine)  + ",'Late Coming', "+mysql.escape(req.body.check_in_date)+",1,1,'Approved','Unpaid',current_timestamp)", (err, fineResult) => {

        res.json({"attendanceResult":attendanceResult,"fineResult":fineResult})
      })

}
    
})


                      } else {
                        res.send(attendanceResult)
                      } 
        
                    })
                }
                else{
                    database.query("Insert into attendance (check_in_datetime,employee_id,no_of_shifts,status) values(" + mysql.escape(req.body.check_in_date+"T"+req.body.check_in_time)+","+req.body.employee_id +" ,"+shift+",'Present')" , (err, attendanceResult) => {
                        let break_point = moment(req.body.check_in_date).set('hour', 10).set('minute', 40).set('second', 0)
                      let fine = moment(req.body.check_in_date+"T"+req.body.check_in_time).diff(break_point, 'minutes')
                      fine = Number(fine) 
                        if (fine > 0) {


                            database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status,status_date) values (" + req.body.employee_id + "," + Number(fine)  + ",'Late Coming', "+mysql.escape(req.body.check_in_date)+",1,1,'Approved','Unpaid',current_timestamp)", (err, fineResult) => {
  
                              res.send(attendanceResult)
                            })
  
  
  
                        } else {
                          res.send(attendanceResult)
                        } 
          
                                    })
                                }
                
            
            })

        }
    })
}
module.exports=markPresentManually