const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require('moment')
const getLastGrade = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Floor Incharge','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
           let queryString="select employee_id,date from automated_grades where id="+req.query.id
            
                database.query(queryString , (err, employeeData, fields) => {
                    let month=moment(employeeData[0].date).month()
                    queryString="select max(id) as max_id from grades where  employee_id="+employeeData[0].employee_id +" and month ="+month
                    database.query(queryString , (err, gradesData, fields) => {
                        queryString="select * from grades where id="+gradesData[0].max_id
                        database.query(queryString , (err, gradesData, fields) => {

                        console.log(err);
                    res.send(gradesData) 
                    })
                })
                    
            })
        }


    })

}

module.exports=getLastGrade