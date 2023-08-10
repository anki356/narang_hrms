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
        res.send(attendanceResult)
                    })
                }
                else{
                    database.query("Insert into attendance (check_in_datetime,no_of_shifts,status) values(" + mysql.escape(req,body.check_in_date+"T"+req.body.check_in_time) +" ,"+shift+",'Present')" , (err, attendanceResult) => {
                        
                        res.send(attendanceResult)
                                    })
                                }
                
            
            })

        }
    })
}
module.exports=markPresentManually