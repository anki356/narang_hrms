const database = require("../../../config/database");
const mysql = require("mysql")
const moment=require("moment")
const addGradesBYFI = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Floor Incharge']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into grades (employee_id,grade_1st,grade_2nd,grade_3rd,grade_4th,month,year,date) values ("+mysql.escape(req.body.employee_id)+","+mysql.escape(req.body.grade_1st)+"," +mysql.escape(req.body.grade_2nd)+","+mysql.escape(req.body.grade_3rd)+","+mysql.escape(req.body.grade_4th)+","+new Date().getMonth()+","+new Date().getFullYear()+",current_timestamp())", (err, gradesData, fields) => {
                let from_date=moment().startOf('month')
                let to_date=moment().add(1,'d')
                database.query("select AVG(grade_1st) as first_Avg ,AVG(grade_2nd) as second_Avg, AVG(grade_3rd) as third_Avg, AVG(grade_4th) as fourth_AVG from grades where employee_id=" + req.body.employee_id + " and  date>=" + mysql.escape(from_date.format("YYYY-MM-DD"))+" and date<="+mysql.escape(to_date.format("YYYY-MM-DD")),(err,gradeResult)=>{
                   console.log(gradeResult)
                    database.query("select id from automated_grades where employee_id="+ req.body.employee_id + " and  date>=" + mysql.escape(from_date.format("YYYY-MM-DD"))+" and date<="+mysql.escape(to_date.format("YYYY-MM-DD")),(err,automatedData)=>{
                        let  total=gradeResult[0].first_Avg+gradeResult[0].second_Avg+gradeResult[0].third_Avg+gradeResult[0].fourth_AVG
                        if(automatedData.length>0){
                           
                            database.query("update automated_grades set grade_1st_avg="+gradeResult[0].first_Avg+",grade_2nd_avg="+gradeResult[0].second_Avg+",grade_3rd_avg="+gradeResult[0].third_Avg+",grade_4th_avg="+gradeResult[0].fourth_AVG+",date=current_timestamp(), total="+total+" where id="+automatedData[0].id,(err,automatedResult)=>{
                                console.log(err);
                                res.send(gradesData) 
                            }) 
                        }
                        else{

                            database.query("Insert Into automated_grades (grade_1st_avg,grade_2nd_avg,grade_3rd_avg,grade_4th_avg,employee_id,total) values ("+gradeResult[0].first_Avg+","+gradeResult[0].second_Avg+","+gradeResult[0].third_Avg+","+gradeResult[0].fourth_AVG+","+req.body.employee_id+","+total+")",(err,automatedResult)=>{
                                console.log(err);
                                res.send(gradesData) 
                            }) 
                        }
                })
                
                
                })     
            })
        }


    })

}

module.exports=addGradesBYFI