const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt=require('bcryptjs')
const editRole = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="Update roles set role_name="+mysql.escape(req.body.role_name)+", department_id="+req.body.department_id+" here id="+req.params.id
            database.query(queryString,(err,result)=>{
                let pr={}
                pr.pr=new Promise((resolve,reject)=>{
                    pr.resolve=resolve
                    pr.reject=reject
                })
                var loopPromises=[]
                database.query("select * from roles_locations where role_id="+req.params.id,(err,rolesLocationsData)=>{
                   
    if(rolesLocationsData.length>=req.body.location_ids.length){
        
        rolesLocationsData.forEach((element)=>{
            let roleLocationIDArray=req.body.location_ids.map((dataOne)=>{
                return dataOne.id
            })
            loopPromises.push(pr.pr)
            if(roleLocationIDArray.includes(element.id)){
                let index=req.body.location_ids.findIndex((elementOne)=>{
    return elementOne.id===element.id
                })
                
                database.query("update roles_locations set location_id="+req.body.location_ids[index].location_id+"where id="+element.id,(err,roleLocationResult)=>{
                    database.query("select * from roles_locations where role_id="+req.body.parentRole+" and location_id="+req.body.location_ids[index].location_id,(err,parentRoleLocationResult)=>{
                        parentRoleLocationResult=parentRoleLocationResult.length>0?parentRoleLocationResult[0].id:null
                    database.query("update hierarchy set parent_role_id="+parentRoleLocationResult+" where child_role_id="+element.id,(err,hierarchyResult)=>{
                   pr.resolve(true)
                    })
                })
            })
            }
            else{
                database.query("delete  from roles_locations where id="+element.id,(err,roleLocationResult)=>{
                    console.log("delete result",roleLocationResult)
                    database.query("delete from hierarchy where child_role_id="+element.id,(err,hierarchyResult)=>{
                        pr.resolve(true)
                    })
                })
            }
        })
    }
    else{
        req.body.location_ids.forEach((element)=>{
            let roleLocationIDArray=rolesLocationsData.map((dataOne)=>{
                return dataOne.id
            })
            loopPromises.push(pr.pr)
            if(roleLocationIDArray.includes(element.id)){
                let index=req.body.location_ids.findIndex((elementOne)=>{
    return elementOne.id===element.id
                })
              
                database.query("update roles_locations set location_id="+req.body.location_ids[index].location_id+"where id="+element.id,(err,roleLocationResult)=>{
                    database.query("select * from roles_locations where role_id="+req.body.parentRole+" and location_id="+req.body.location_ids[index].location_id,(err,parentRoleLocationResult)=>{
    console.log(parentRoleLocationResult)
    parentRoleLocationResult=parentRoleLocationResult.length>0?parentRoleLocationResult[0].id:null
                    database.query("update hierarchy set parent_role_id="+parentRoleLocationResult+" where child_role_id="+element.id,(err,hierarchyResult)=>{
                        console.log(err)
                   pr.resolve(true)
                    })
                    })
                })
            }
            else{
                database.query("insert into roles_locations (role_id,location_id) values("+req.params.id+","+element.location_id+")",(err,roleLocationResult)=>{
                    database.query("select * from roles_locations where role_id="+req.body.parentRole+" and location_id="+element.location_id,(err,parentRoleLocationResult)=>{
                        parentRoleLocationResult=parentRoleLocationResult.length>0?parentRoleLocationResult[0].id:null
                        database.query("insert into hierarchy (parent_role_id,child_role_id) values ("+parentRoleLocationResult+","+roleLocationResult.insertId+")",(err,hierarchyResult)=>{
                            console.log(err)
                            pr.resolve(true)
                        })
                    })
                })
            }
        })
    }
    })
    
                      Promise.all(loopPromises).then(()=>{
    
    
                          
                         
                       
                                              let pr={}
                                              if(req.body.attendance===true){
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Insert into permission_roles (role_id,permission_id) values("+req.params.id+","+1+")",(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              else{
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Delete from permission_roles where role_id="+req.params.id+" and permission_id="+1,(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              if(req.body.timing_approval===true){
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Insert into permission_roles (role_id,permission_id) values("+req.params.id+","+2+")",(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              else{
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Delete  from permission_roles where role_id="+req.params.id+" and permission_id="+2,(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              if(req.body.interview===true){
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Insert into permission_roles (role_id,permission_id) values("+req.params.id+","+3+")",(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              else{
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Delete from permission_roles where role_id="+req.params.id+" and permission_id="+3,(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              if(req.body.employee_detail===true){
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Insert into permission_roles (role_id,permission_id) values("+req.params.id+","+4+")",(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              else{
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Delete from permission_roles where role_id="+req.params.id+" and permission_id="+4,(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              if(req.body.salary===true){
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Insert into permission_roles (role_id,permission_id) values("+req.params.id+","+5+")",(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              else{
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Delete from permission_roles where role_id="+req.params.id+" and permission_id="+5,(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              } if(req.body.fine_management===true){
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Insert into permission_roles (role_id,permission_id) values("+req.params.id+","+6+")",(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                              else{
                                               pr.pr=new Promise((resolve,reject)=>{
                                                   pr.resolve=resolve
                                                   pr.reject=reject
                                               })
                                               database.query("Delete from permission_roles where role_id="+req.params.id+" and permission_id="+6,(err,permissionata)=>{
                                                   pr.resolve(true)
                                                                   })    
                                              }
                                           
                                              Promise.all([pr.pr]).then(()=>{
                                              
                                                  res.send(result)
                                           })
                                           
                                         
                                        })
            })
            
       
        }
    

    })

}

module.exports=editRole