const database = require("../../../config/database");
const mysql = require("mysql")
const addDepartment = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        console.log(err)
        let allowed_roles = [ 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into departments (name) values ("+mysql.escape(req.body.department)+")",(err,result)=>{
                console.log(err)
                res.send(result)
            })
        }
    })
}
module.exports=addDepartment