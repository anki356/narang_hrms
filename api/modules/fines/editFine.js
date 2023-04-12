const database = require("../../../config/database");
const mysql=require('mysql')
const editFine = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, async(err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            if(req.body.amount){

               await  database.query("update fines set amount="+req.body.amount+" where id="+req.params.id, (err, amountResult, fields) => {
                
                })
            }
            if(req.body.reason){
              await  database.query("update fines set reason="+mysql.escape(req.body.reason)+" where id="+req.params.id, (err, reasonResult, fields) => {
                    
                        
                })
            }
            res.send("Updated")
        }



    })

}

module.exports=editFine