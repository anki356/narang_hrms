const database = require("../../../config/database");
const mysql=require('mysql')
const addGradesByAdmins = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("select * from grades where employee_id="+req.body.employee_id+" and month="+new Date().getMonth(), (err, gradesFirstData, fields) => {
                let total_marks=gradesFirstData[0].grade_1st+ gradesFirstData[0].grade_2nd+ gradesFirstData[0].grade_3rd+ gradesFirstData[0].grade_4th+req.body.grade_5th+req.body.grade_6th+req.body.grade_7th
                let grade_equivalent
               if(total_marks>90){
                grade_equivalent="A+"
               }
               else if(total_marks>80 && total_marks<90){
                grade_equivalent='A'
               }
               else if(total_marks>70 && total_marks<80){
                grade_equivalent='B+'
               }
               else if(total_marks>60 && total_marks<70){
                grade_equivalent='B'
               }
               else if(total_marks>50 && total_marks<60){
                grade_equivalent='C+'
               }
               else if(total_marks>40 && total_marks<50){
                grade_equivalent='C'
               }
               else if(total_marks>30 && total_marks<40){
                grade_equivalent='D+'
               }
               else if(total_marks>20 && total_marks<30){
                grade_equivalent='D'
               }
               else {
                grade_equivalent='F'
               }

            database.query("Update grades set grade_5th ="+req.body.grade_5th+",grade_6th ="+req.body.grade_6th+",grade_7th="+req.body.grade_7th+",total_grades="+total_marks+",grade_equivalent="+mysql.escape(grade_equivalent)+",modified_date = current_timestamp() where employee_id="+req.body.employee_id+" and month="+new Date().getMonth(), (err, gradesData, fields) => {
                console.log(err)
                res.send(gradesData) 
                    
            })
        })
        }


    })

}

module.exports=addGradesByAdmins