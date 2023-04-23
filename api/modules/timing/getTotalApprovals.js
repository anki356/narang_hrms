
const database = require("../../../config/database");
const getTotalApprovals = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'Floor Incharge','Guard']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count(timing.id) from timing where timing.approval_status='Approved' and date>="+req.query.from_date+" and date <"+req.query.to_date , (err, timingResult, fields) => {
                console.log(err)
                res.send(timingResult) 
                    
            })
        }


    })

}

module.exports=getTotalApprovals