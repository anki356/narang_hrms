const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const updateTiming= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select * from timing where id="+req.params.id,(err,timingResult)=>{
if(timingResult[0].timer!==null&& moment([timingResult[0].timer],'HH:mm:ss').diff(moment([req.body.timer],'HH:mm:ss'),'minute')<0){
    let fine=moment([req.body.timer],'HH:mm:ss').diff(moment([timingResult[0].timer],'HH:mm:ss'),'minute')
    database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status,status_date) values ("+timingResult[0].employee_id+","+fine+",'Late Coming After Going Out', current_timestamp(),1,1,'Approved','Unpaid',current_timestamp() )",(err,fineResult)=>{


    database.query("Update timing set in_time="+mysql.escape(req.body.in_time)+",timer="+mysql.escape(req.body.timer)+", modified_date_time=current_timestamp() where id="+req.params.id, (err, timingUpdateResult, fields) => {
        res.json({"timingUpdateResult":timingUpdateResult,fineResult:fineResult}) 
            
    })
})
}
else if(moment([req.body.timer],'HH:mm:ss').diff(moment(['00:10:00'],'HH:mm:ss'),'minute')>0&&timingResult[0].reason!=='Lunch'){
    let fine=moment([req.body.timer],'HH:mm:ss').diff(moment(['00:10:00'],'HH:mm:ss'),'minute')
    database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status,status_date) values ("+timingResult[0].employee_id+","+fine+",'Late Coming After Going Out', current_timestamp(),1,1,'Approved','Unpaid',current_timestamp() )",(err,fineResult)=>{


    database.query("Update timing set in_time="+mysql.escape(req.body.in_time)+",timer="+mysql.escape(req.body.timer)+", modified_date_time=current_timestamp() where id="+req.params.id, (err, timingUpdateResult, fields) => {
        res.json({"timingUpdateResult":timingUpdateResult,fineResult:fineResult}) 
            
    })
})
}
else if(moment([req.body.timer],'HH:mm:ss').diff(moment(['00:25:00'],'HH:mm:ss'),'minute')>0&&timingResult[0].reason==='Lunch'){
    let fine=moment([req.body.timer],'HH:mm:ss').diff(moment(['00:25:00'],'HH:mm:ss'),'minute')
    database.query("Insert into fines (employee_id,amount,reason,date,recall_head,head_approval,status,payment_status,status_date) values ("+timingResult[0].employee_id+","+fine+",'Late Coming After Going Out', current_timestamp(),1,1,'Approved','Unpaid',current_timestamp() )",(err,fineResult)=>{


    database.query("Update timing set in_time="+mysql.escape(req.body.in_time)+",timer="+mysql.escape(req.body.timer)+", modified_date_time=current_timestamp() where id="+req.params.id, (err, timingUpdateResult, fields) => {
        res.json({"timingUpdateResult":timingUpdateResult,fineResult:fineResult}) 
            
    })
})
}
else{
    database.query("Update timing set in_time="+mysql.escape(req.body.in_time)+",timer="+mysql.escape(req.body.timer)+", modified_date_time=current_timestamp() where id="+req.params.id, (err, timingUpdateResult, fields) => {
        res.json({"timingUpdateResult":timingUpdateResult}) 
            
    })  
}
               
        
            })
          
        }


    })

}

module.exports=updateTiming