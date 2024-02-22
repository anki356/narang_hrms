const database = require("../../../config/database");
const mysql=require('mysql')
const addFine = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into fine_requests (fine_id,fine_document_id) values("+req.body.fine_id, (err, fineData, fields) => {
                console.log(err)
                res.send(fineData) 
                    
            })
        }



    })

}

module.exports=addFine