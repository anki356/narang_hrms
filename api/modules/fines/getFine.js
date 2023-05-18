const database = require("../../../config/database");
const mysql = require("mysql")
const getFine = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['HR Head','HR Assistant','Super Admin','Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="SELECT job_details.*,employees.*, file_upload.name as photo, fines.*,employees.name as employee_name ,employees.employee_id as empID, floors.name as floor_name,stores.name as store_name from fines left join employees on employees.id=fines.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id left join roles on job_details.role_id=roles.id left join stores on job_details.store_id=stores.id where fines.id="+req.query.id
           
                database.query(queryString , (err, fineData, fields) => {
                    let promiseArray=[]
                    fineData.forEach((data,index)=>{
                        var pr={}
                        pr.promise=new Promise((resolve,reject)=>{
                           pr.resolve=resolve
                           pr.reject=reject
            
                        })
    promiseArray[index]=pr.promise
                        database.query("select employees.name from employees left join job_details on job_details.head_employee_id=employees.id where job_details.id="+data.job_details_id,(err,headEmployeeData)=>{
                            console.log(err)
                            data.headEmployeeData=headEmployeeData
                            pr.resolve(true)
                            
                        } )
                        
                    })
                    Promise.all(promiseArray).then(()=>{
                        res.send(fineData)   
                    })
                    
            })
        }



    })

}

module.exports=getFine
