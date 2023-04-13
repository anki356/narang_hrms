const database = require("../../../config/database");
const getTotalEmployeesOnLeave = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT count (employee_id) from leaves where leaves.date>="+req.query.from_date +" and leaves.date<"+req.query.to_date , (err, leavesData, fields) => {
                res.send(leavesData) 
                    
            })
        }



    })

}
module.exports=getTotalEmployeesOnLeave