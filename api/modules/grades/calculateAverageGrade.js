const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require("moment")
const calculateAverageGrade = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let from_date=moment().startOf('month').subtract(1,'month')
            let to_date=moment().endOf('month').add(1,'d').subtract(1,'month')
          database.query("Select Avg(Total) as average from automated_grades where date>="+mysql.escape(from_date.format("YYYY-MM-DD"))+" and date<="+mysql.escape(to_date.format("YYYY-MM-DD")),(err,result)=>{
            console.log(err)
            if (result[0].average > 95) {
                grade_equivalent = "A+"
    }
            else if (result[0].average > 91) {
                grade_equivalent = "A"
            }
            else if (result[0].average > 85) {
                grade_equivalent = "B+"
    }
            else if (result[0].average > 80) {
                grade_equivalent = "B"
            }
            else {
                grade_equivalent = "C"
            }
            res.send(grade_equivalent)
          })
        }


    })

}

module.exports=calculateAverageGrade