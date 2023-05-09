const database = require("../../../config/database");
const mysql = require("mysql")
const addGradesBYFI = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Floor Incharge 1','Floor Incharge 2']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into grades (employee_id,grade_1st,grade_2nd,grade_3rd,grade_4th,month,year,date) values ("+mysql.escape(req.body.employee_id)+","+mysql.escape(req.body.grade_1st)+"," +mysql.escape(req.body.grade_2nd)+","+mysql.escape(req.body.grade_3rd)+","+mysql.escape(req.body.grade_4th)+","+new Date().getMonth()+","+new Date().getFullYear()+",current_timestamp())", (err, gradesData, fields) => {
                console.log(err)
                res.send(gradesData) 
                    
            })
        }


    })

}

module.exports=addGradesBYFI