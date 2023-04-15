const database = require("../../../config/database");
const mysql = require("mysql")
const updateAttendance= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into interview (name,interviewer_employee_id,expected_salary,fathers_name,qualification,date_time,remarks,status,designation_id,experience,reference_id) values( "+req.body.name+","+req.body.interviewer_employee_id+","+req.body.expected_salary+","+req.body.fathers_name+","+req.body.qualification+","+ req.body.date_time+","+req.body.remarks+","+req.body.status+","+req.body.designation_id+","+req.body.experience+","+req.body.reference_id+")",async(err, interviewResult, fields) => {
                console.log(err)
            await    req.files.forEach(async (data)=>{
                   database.query("Insert into file_upload (type,name) values ('attendance_image',"+mysql.escape(data.filename)+")",(err,fileResult,fields)=>{ 
                    console.log(err)
                        database.query("Insert into interview_documents (interview_id,document_id) values ("+interviewResult.insertId+","+fileResult.insertId+")",(err,interviewFileResult,fields)=>{ 
                         console.log(err)  
                        })
                    }) 
                })         
                res.send("Interview Results Inserted")          
                    })
            
            
            
        
          
        }


    })

}

module.exports=updateAttendance