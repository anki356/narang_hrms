const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require("moment")
const addGrades = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = [' HR Head','HR Assistant','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
           let query="select count(attendance.id)  as attendance_count,sum(amount)as total_fine from attendance left join fines on fines.employee_id=attendance.employee_id where attendance.employee_id="+req.body.employee_id+" and check_in_datetime>="+mysql.escape(req.body.from_date)+" and check_in_datetime<="+mysql.escape(req.body.to_date)+" and attendance.status='Present'"
           database.query(query,(err,result)=>{
            let from_moment = moment(req.body.from_date, "YYYY-MM-DD")
                let to_moment = moment(req.body.to_date, "YYYY-MM-DD")
                let total_working_days = to_moment.diff(from_moment, 'd')
               
                attendance_percentage = result[0].attendance_count * 100 / total_working_days
                let grade_5th
                if (attendance_percentage > 90) {
                    grade_5th = 10
                }
                else if (attendance_percentage > 80) {
                grade_5th = 7
                }
                else if (attendance_percentage > 60) {
                    grade_5th = 5
                }
                else {
                grade_5th = 0
                }
                console.log(total_working_days)
                let avg_commission = req.body.commission / total_working_days
                let grade_6th
                if (avg_commission > 125) {
                grade_6th = 10
                }
                else if (avg_commission > 100) {
                grade_6th = 9
                }
                else if (avg_commission > 90) {
            grade_6th = 8
                }
                else if (avg_commission > 70) {
                    grade_6th = 5
                }
                else {
                    grade_6th = 0
                }
                let total_fine
                    if (result[0].total_fine === null) {
                        total_fine = 0
                    }
                    else {
                        total_fine = result[0].total_fine
                    }
                    
                    let grade_7th
                    if (total_fine < 2) {
                     grade_7th = 10
                    }
                    else if (total_fine < 7) {
                        grade_7th = 9
                    }
                    else if (total_fine < 10) {
                    grade_7th = 8
                    }
                    else if (total_fine < 15) {
                        grade_7th = 5
                    }
                    else {
                        grade_7th = 0
                    }

                    database.query("select AVG(grade_1st) as first_Avg ,AVG(grade_2nd) as second_Avg, AVG(grade_3rd) as third_Avg, AVG(grade_4th) as fourth_AVG from grades where employee_id=" + req.body.employee_id + " and  date>=" + mysql.escape(req.body.from_date)+" and date<="+mysql.escape(req.body.to_date),(err,gradeResult)=>{
                        console.log(err);
           
           
                    database.query("select id from automated_grades where employee_id="+req.body.employee_id+" and date>="+mysql.escape(req.body.from_date)+" and date<="+mysql.escape(req.body.to_date),(err,automatedGradeResult)=>{
                         console.log(err)
                        let total_grades = gradeResult[0].first_Avg + gradeResult[0].second_Avg + gradeResult[0].third_Avg + gradeResult[0].fourth_AVG + (grade_5th + grade_6th + grade_7th) * 2
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
                        if(automatedGradeResult.length>0){

                            const updateQuery = 'UPDATE automated_grades SET WD_Grade='+grade_5th+',COM_Grade='+grade_6th+',Fine_Marks='+grade_7th+',grade_1st_avg='+gradeResult[0].first_Avg+', grade_2nd_avg='+gradeResult[0].second_Avg+', grade_3rd_avg='+gradeResult[0].third_Avg+', grade_4th_avg='+gradeResult[0].fourth_AVG+', Grade_Equivalent='+grade_equivalent+', Total='+total_grades+',date=current_timestamp() WHERE id='+automatedGradeResult[0].id;
                           database.query(updateQuery,(err,finalResult)=>{
                            res.send(finalResult)
                           })
                        }
                        else{
                         const insertQuery="Insert into automated_grades (WD_Grade,COM_Grade,Fine_Marks,grade_1st_avg,grade_2nd_avg,grade_3rd_avg,grade_4th_avg,Grade_Equivalent,Total,employee_id) values ("+grade_5th+","+grade_6th+","+grade_7th+","+gradeResult[0].first_Avg+","+gradeResult[0].second_Avg+","+gradeResult[0].third_Avg+","+gradeResult[0].fourth_AVG+","+mysql.escape(grade_equivalent)+","+total_grades+","+req.body.employee_id+")"
                         database.query(insertQuery,(err,finalResult)=>{
                            console.log(err)
                            res.send(finalResult)
                         })
                        }
                    })
                    })
           })

        }


    })

}

module.exports=addGrades