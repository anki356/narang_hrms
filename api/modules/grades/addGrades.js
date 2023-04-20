const database = require("../../../config/database");
const mysql = require("mysql")
const addGrades = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = [' HR Head','HR Assistant','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into grades (employee_id,grade_1st,month,year,date) values ("+mysql.escape(req.body.employee_id)+","+req.body.grade_1st+","+new Date().getMonth()+","+new Date().getFullYear()+",current_timestamp())", (err, gradesData, fields) => {
                console.log(err)
                res.send(gradesData) 
                    
            })
        }


    })

}

module.exports=addGrades