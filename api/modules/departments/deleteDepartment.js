const database = require("../../../config/database");
const mysql = require("mysql")
const deleteDepartment = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        console.log(err)
        let allowed_roles = [ 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("delete from departments  where id="+req.params.id,(err,result)=>{
                console.log(err)
                res.send(result)
            })
        }
    })
}
module.exports=deleteDepartment