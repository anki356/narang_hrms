const database = require("../../../config/database");
const mysql=require('mysql')
const deleteFine = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("delete from fines where id="+req.params.id, (err, fineData, fields) => {
                res.send(fineData) 
                    
            })
        }



    })

}

module.exports=deleteFine