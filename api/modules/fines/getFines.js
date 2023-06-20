const database = require("../../../config/database");
const mysql = require("mysql")
const getFines = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        database.query("select role_id ,permissions.name from permission_roles left join permissions on permissions.id=permission_roles.permission_id where name='Fine Management'",(
            err,allowed_roles 
         )=>{
           
            console.log(allowed_roles) 
           allowed_roles=allowed_roles.map((data)=>{
             return data.role_id
           })
        if (allowed_roles.includes(role_id)) {
        
            let queryString="SELECT job_details.*,employees.*, file_upload.name as photo, fines.*,employees.name as employee_name ,employees.employee_id as empID, floors.name as floor_name,locations.name as location_name from fines left join employees on employees.id=fines.employee_id left join job_details on job_details.id=employees.job_details_id left join floors on floors.id=job_details.floor_id left join file_upload on file_upload.id=employees.photo_id left join roles on job_details.role_id=roles.id left join locations on job_details.location_id=locations.id  where locations.name="+ mysql.escape(req.query.location_name)
             
            if(req.query.floor_name){
             queryString+=" and floors.name=" +mysql.escape(req.query.floor_name)
            }
            
            if(req.query.status){
             queryString+=" and leaves.status in ("+ req.query.status+")"
            }
            if(req.query.role_name){
             queryString+=" and roles.role_name="+mysql.escape(req.query.role_name)
            }
            if(req.query.employee_id){
             queryString+="and employees.employee_id="+ req.query.employee_id
            }
            if(req.query.from_date && req.query.to_date){
             queryString+=" and fines.date>="+mysql.escape(req.query.from_date)+" and fines.date<"+mysql.escape(req.query.to_date)
            }
            
            if(req.query.employee_query){
             queryString+=" and (employees.employee_id like '%"+ req.query.employee_query+"%'or employees.name like '%"+req.query.employee_query+"%')"
            }
            if(req.query.limit){
             queryString+=" limit "+req.query.limit
            }
            if(req.query.offset){
             queryString+=" Offset "+req.query.offset
           
            }
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

    })

}

module.exports=getFines
