const database = require("../config/database");
const moment=require("moment")
const mysql = require("mysql")
const getCommissionData = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head', 'HR Assistant','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {

database.query("select commission,date from commission where employee_id= "+req.query.employee_id+" and date>="+mysql.escape(moment(req.query.date).startOf('isoWeek'))+" and date<="+mysql.escape(moment(req.query.date).endOf('isoWeek')),(err,commissionData)=>{
    res.send(commissionData)
})


        }
    })
}
module.exports=getCommissionData