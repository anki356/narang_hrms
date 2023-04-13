const database = require("../../../config/database");
const getFinesByFloor = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','HR Assistant']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("SELECT fines.*,employees.name ,employees.employee_id as empID, floors.name as floor_name from fines left join employees on employees.id=fines.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id where floors.name="+req.query.floor_name , (err, fineData, fields) => {
                res.send(fineData) 
                    
            })
        }



    })

}

module.exports=getFinesByFloor