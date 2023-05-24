const database = require("../../../config/database");
const mysql = require("mysql")
const addRole = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into roles (role_name,floor_id,store_id) values("+mysql.escape(req.body.role_name)+","+req.body.floor_id+","+req.body.store_id+")", (err, roleData, fields) => {
                console.log(err)
                res.send(roleData) 
                    
            })
        }


    })

}

module.exports=addRole