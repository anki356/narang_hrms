const database = require("../../../config/database");
const mysql = require("mysql")
const getRoles = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant','HR Head','Admin','Super Admin','Guard','Floor Incharge 1', 'Floor Incharge 2']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select roles.role_name as name,roles.id as id from roles ", (err, roleData, fields) => {
                console.log(err)
                res.send(roleData) 
                    
            })
        }
    })

}

module.exports=getRoles