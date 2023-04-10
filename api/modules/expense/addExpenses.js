const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const addExpenses = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into expenses (employee_id,category_id,sub_category_id,date,amount,notes,status) values ("+mysql.escape(req.body.employee_id)+","+mysql.escape(req.body.category_id)+"," +mysql.escape(req.body.sub_category_id)+","+mysql.escape(req.body.date)+","+mysql.escape(req.body.amount)+","+mysql.escape(req.body.notes)+","+mysql.escape(req.body.status)+")", (err, expenseData, fields) => {
                res.send(expenseData) 
                    
            })
        }


    })

}

module.exports=addExpenses