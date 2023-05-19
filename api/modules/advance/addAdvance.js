const database = require("../../../config/database");
const mysql = require("mysql")
const addAdvance = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into file_upload (type,name) values ('advance_document_image'," + mysql.escape(req.file.filename) + ")", (err, fileResult, fields) => {
            database.query("Insert into advance (date,employee_id,amount,recall_head,head_approval,file_id,status,payment_status) values("+mysql.escape(req.body.date)+","+req.body.employee_id+","+req.body.amount+","+req.body.recall_head+","+req.body.head_approval+","+fileResult.insertId+",'Pending','Unpaid')" , (err, advanceData, fields) => {
                res.send(advanceData) 
                    
            })
        })
        }



    })

}

module.exports=addAdvance