const database = require("../../../config/database");
const mysql = require("mysql")
const addBonus = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            
            database.query("Insert into file_upload (type,name) values ('bonus_document'," + mysql.escape(req.file.filename) + ")", (err, fileResult, fields) => {
                
                
                database.query("Insert Into bonus (employee_id,amount,document_id) values ("+mysql.escape(req.body.employee_id)+"," +mysql.escape(req.body.amount)+","+fileResult.insertId+")", (err, bonusData, fields) => {
                   
                    res.send(bonusData) 
                        
                })
            })
        
        }


    })

}

module.exports=addBonus