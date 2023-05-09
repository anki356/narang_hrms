const  mysql  = require("mysql");
const database = require("../../../config/database");
const updateTimingStatus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            
            database.query("update timing set approval_status='Rejected', status_date= current_timestamp() ,modified_date_time=current_timestamp() ,  status_id="+role_id+" where id="+req.params.id , (err, timingData, fields) => {
                console.log(err)
                res.send(timingData) 
                    
            })
        
        }



    })

}
module.exports=updateTimingStatus