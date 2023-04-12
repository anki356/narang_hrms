const database = require("../../../config/database");
const getExpenses = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin', 'Super Admin', 'HR Head', 'HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT floors.name as floor_name expenses.status,expenses_categories.name as category_name,expenses_sub_categories.name as sub_category_name, expenses.approval_date,employees.name,employees.employee_id FROM expenses LEFT JOIN expenses_categories ON expenses_categories.id=expenses.category_id LEFT JOIN employees ON employees.id=expenses.employee_id LEFT JOIN expenses_sub_categories ON expenses_sub_categories.id=expenses.sub_category_id left join floors on floor.id=job_details.floor_id where date>="+req.query.from_date+"and date<"+req.query.to_date , (err, expenseData, fields) => {
                res.send(expenseData) 
                    
            })
        }


    })

}

module.exports=getExpenses