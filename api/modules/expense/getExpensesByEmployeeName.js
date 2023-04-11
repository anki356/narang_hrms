const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const getExpensesByEmployeeName = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT floors.name AS floor_name,expenses.status,expenses_categories.name AS category_name,expenses_sub_categories.name AS sub_category_name,expenses.date, expenses.approval_date,employees.name,employees.employee_id ,employees.name FROM expenses LEFT JOIN expenses_categories ON expenses_categories.id=expenses.category_id LEFT JOIN employees ON employees.id=expenses.employee_id LEFT JOIN job_details ON employees.job_details_id=job_details.id LEFT JOIN expenses_sub_categories ON expenses_sub_categories.id=expenses.sub_category_id LEFT JOIN floors ON floors.id=job_details.floor_id WHERE expenses.date>="+req.query.from_date+"and expenses.date<"+req.query.to_date+"and employees.name="+req.query.employee_name , (err, expenseData, fields) => {
                res.send(expenseData) 
                    
            })
        }


    })

}

module.exports=getExpensesByEmployeeName