const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require("moment")
const addGrades = (from_date,to_date,commission) => {
   
           let query="select count(attendance.id)  as attendance_count,attendance.employee_id,sum(amount)as total_fine from attendance left join employees on employees.id=attendance.employee_id left join fines on fines.employee_id=attendance.employee_id  where check_in_datetime>="+mysql.escape(from_date)+" and check_in_datetime<="+mysql.escape(to_date)+" and attendance.status='Present' group by attendance.employee_id" +" and employees.status=1"
           database.query(query,(err,result)=>{
            console.log(err)
            let promiseArray=[]
            result.forEach((data,index)=>{
                let pr={}
                pr.pr=new Promise((resolve, reject) => {
                    pr.resolve=resolve
                    pr.reject=reject
                })
promiseArray[index]=pr.pr
                let from_moment = moment(from_date, "YYYY-MM-DD")
                let to_moment = moment(to_date, "YYYY-MM-DD")
                let total_working_days = to_moment.diff(from_moment, 'd')
               
                attendance_percentage = data.attendance_count * 100 / total_working_days
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
                let avg_commission = commission / total_working_days
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
                    if (data.total_fine === null) {
                        total_fine = 0
                    }
                    else {
                        total_fine = data.total_fine
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
console.log(data)
                    database.query("select AVG(grade_1st) as first_Avg ,AVG(grade_2nd) as second_Avg, AVG(grade_3rd) as third_Avg, AVG(grade_4th) as fourth_AVG from grades where employee_id=" + data.employee_id + " and  date>=" + mysql.escape(from_date)+" and date<="+mysql.escape(to_date),(err,gradeResult)=>{
                        console.log(err);
           
           
                    database.query("select id from automated_grades where employee_id="+data.employee_id+" and date>="+mysql.escape(from_date)+" and date<="+mysql.escape(to_date),(err,automatedGradeResult)=>{
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
let to_date=moment(to_date).subtract(1,'d').format("YYYY")
                            const updateQuery = 'UPDATE automated_grades SET WD_Grade='+grade_5th+',COM_Grade='+grade_6th+',Fine_Marks='+grade_7th+',grade_1st_avg='+gradeResult[0].first_Avg+', grade_2nd_avg='+gradeResult[0].second_Avg+', grade_3rd_avg='+gradeResult[0].third_Avg+', grade_4th_avg='+gradeResult[0].fourth_AVG+', Grade_Equivalent='+grade_equivalent+', Total='+total_grades+',date='+to_date+' WHERE id='+automatedGradeResult[0].id;
                           database.query(updateQuery,(err,finalResult)=>{
                            pr.resolve(true)
                           })
                        }
                        else{
                         const insertQuery="Insert into automated_grades (WD_Grade,COM_Grade,Fine_Marks,grade_1st_avg,grade_2nd_avg,grade_3rd_avg,grade_4th_avg,Grade_Equivalent,Total,employee_id) values ("+grade_5th+","+grade_6th+","+grade_7th+","+gradeResult[0].first_Avg+","+gradeResult[0].second_Avg+","+gradeResult[0].third_Avg+","+gradeResult[0].fourth_AVG+","+mysql.escape(grade_equivalent)+","+total_grades+","+data.employee_id+")"
                         database.query(insertQuery,(err,finalResult)=>{
                            console.log(err)
                            pr.resolve(true)
                         })
                        }
                    })
                    })

            })
            Promise.all(promiseArray).then(()=>{
                return  
            })
                      })

       
}

module.exports=addGrades