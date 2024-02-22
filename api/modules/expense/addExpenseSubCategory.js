const database = require("../../../config/database");
const mysql = require("mysql")
const addExpenseSubCategory = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into expenses_sub_categories (category_id,name) values (3,"+mysql.escape(req.body.expense_sub_category_name)+")", (err, expenseSubCategoriesData, fields) => {
                res.send(expenseSubCategoriesData) 
                    
            })
        }


    })

}

module.exports=addExpenseSubCategory