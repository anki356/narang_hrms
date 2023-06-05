const database = require("../../../config/database");
const mysql = require("mysql")
const addInterview= (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        let allowed_roles = [ 'HR Head','Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert into interview (name,status,interviewer_employee_id,expected_salary,fathers_name,date_time,remarks,designation_id,experience,reference_id,department_id,hired_by_employee_id) values( "+mysql.escape(req.body.name)+",'Pending',"+req.body.interviewer_employee_id+","+req.body.expected_salary+","+mysql.escape(req.body.fathers_name)+","+ mysql.escape(req.body.date_time)+","+mysql.escape(req.body.remarks)+","+req.body.designation_id+","+mysql.escape(req.body.experience)+","+req.body.reference_id+","+mysql.escape(req.body.department_id)+","+req.body.hired_by_employee_id+")",async(err, interviewResult, fields) => {
                console.log(err)
            await    req.files.forEach(async (data)=>{
                   database.query("Insert into file_upload (type,name) values ('attendance_image',"+mysql.escape(data.filename)+")",(err,fileResult,fields)=>{ 
                    console.log(err)
                        database.query("Insert into interview_documents (interview_id,document_id) values ("+interviewResult.insertId+","+fileResult.insertId+")",(err,interviewFileResult,fields)=>{ 
                         console.log(err)  
                        })
                    }) 
                })         
                res.send(interviewResult)          
                    })
            
            
            
        
          
        }


    })

}

module.exports=addInterview