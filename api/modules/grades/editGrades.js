const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require("moment")
const editGrade = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Super Admin','Admin','Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {

            let queryString="select date,WD_Grade,COM_Grade,Fine_Marks from automated_grades where id="+req.params.id
            
            database.query(queryString , (err, employeeData, fields) => {
                let month=moment(employeeData[0].date).month()
                queryString="select max(id) as max_id from grades where  employee_id="+req.body.employee_id +" and month ="+month
                database.query(queryString , (err, gradesData, fields) => {
       
                    console.log(gradesData);
                        queryString="update grades set grade_1st="+req.body.grade_1st+" ,grade_2nd="+req.body.grade_2nd+", grade_3rd="+req.body.grade_3rd+" ,grade_4th="+req.body.grade_4th+" where id="+gradesData[0].max_id
                        database.query(queryString , (err, gradesData, fields) => {
                            console.log(err);
                            let from_date=moment(employeeData[0].date).startOf('month').format("YYYY-MM-DD")
                            let to_date=moment(employeeData[0].date).endOf('month').add(1,'d').format("YYYY-MM-DD")
                            database.query("select AVG(grade_1st) as first_Avg ,AVG(grade_2nd) as second_Avg, AVG(grade_3rd) as third_Avg, AVG(grade_4th) as fourth_AVG from grades where employee_id=" + req.body.employee_id + " and  date>=" + mysql.escape(from_date)+" and date<="+mysql.escape(to_date),(err,gradeResult)=>{
                                console.log(err);
                                if(employeeData[0].COM_Grade===null){
                                    employeeData[0].COM_Grade=0
                                    employeeData[0].WD_Grade=0
                                    employeeData[0].Fine_Marks=0
                                }
                                let total_grades = gradeResult[0].first_Avg + gradeResult[0].second_Avg + gradeResult[0].third_Avg + gradeResult[0].fourth_AVG + (employeeData[0].COM_Grade + employeeData[0].WD_Grade + employeeData[0].Fine_Marks) * 2
                        let grade_equivalent
                        if (total_grades > 95) {
                            grade_equivalent = "A+"
                }
                        else if (total_grades > 91) {
                            grade_equivalent = "A"
                        }
                        else if (total_grades > 85) {
                            grade_equivalent = "B+"
                }
                        else if (total_grades > 80) {
                            grade_equivalent = "B"
                        }
                        else {
                            grade_equivalent = "C"
                        }
                        database.query("update automated_grades set grade_1st_avg="+gradeResult[0].first_Avg+",grade_2nd_avg="+gradeResult[0].second_Avg+",grade_3rd_avg="+gradeResult[0].third_Avg+",grade_4th_avg="+gradeResult[0].fourth_AVG+",Total="+total_grades+",grade_equivalent= "+mysql.escape(grade_equivalent)+ " where id="+req.params.id,(err,automatedResult)=>{
                            console.log(err);
                            res.send(automatedResult) 
                        }) 
                              
                            })
                        
                    })
                
           
            })
                
        })




        }
    })
}
module.exports= editGrade