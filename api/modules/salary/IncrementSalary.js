const database = require("../../../config/database");
const moment=require('moment')
const mysql=require('mysql')
const addSalaryDetails = async(req,res,next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id,async (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
       
        }
    })
        
      
}

module.exports=addSalaryDetails