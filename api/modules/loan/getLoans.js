const database = require("../../../config/database");
const getLoans = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT  loan.*,file_upload.name as photo,employees.name,employees.employee_id as empID,floors.name as floor_name from loan left join employees on employees.id=loan.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id" , (err, loanData, fields) => {
                console.log(err)
                res.send(loanData) 
                    
            })
        }



    })

}
module.exports=getLoans