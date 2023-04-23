const database = require("../../../config/database");
const mysql=require('mysql')
const editFine = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, async(err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString
           

                 queryString="update fines set amount="+req.body.amount+" and reason="+mysql.escape(req.body.reason)+" where id="+req.params.id 
        
            

            await  database.query(queryString, (err, amountResult, fields) => {
                res.send(amountResult)
            })
            
        }



    })

}

module.exports=editFine