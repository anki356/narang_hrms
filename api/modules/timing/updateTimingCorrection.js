const database = require("../../../config/database");
const mysql = require("mysql")
const updateTimingCorrection= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into file_upload (type,name) values ('in_time_image',"+mysql.escape(req.file.filename)+")",(err,fileResult,fields)=>{ 
                database.query("Update timing set in_time="+req.body.in_time+",timer="+req.body.timer+",file_upload_id="+fileResult.insertId+", modified_date_time = current_timestamp() where timing.id="+req.params.id, (err, timingResult, fields) => {
                   console.log(err)
                    res.send(timingResult) 
                        
                })
            })
               
        
          
        }


    })

}

module.exports=updateTimingCorrection