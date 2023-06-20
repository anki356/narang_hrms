const database = require("../../../config/database");
const mysql = require("mysql")
const bcrypt=require('bcryptjs')
const editRole = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            let queryString="Update roles set role_name="+mysql.escape(req.body.role_name)
           
            queryString+="where id="+req.params.id
            if(req.body.username===undefined||req.body.username===''){
                req.body.username=null
            }
            database.query(queryString,(err,result)=>{
                if(req.body.password!==null)
               {
               
                bcrypt.hash(req.body.password,10,(err,hash)=>{
database.query("update users set username="+mysql.escape(req.body.username)+" ,password="+mysql.escape(hash)+" where role_id="+req.params.id,(err,userResult)=>{
   console.log(err)
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
   
       res.send(userResult)
})

})
                })
               } 
               else{
                database.query("update users set username="+mysql.escape(req.body.username)+" where role_id="+req.params.id,(err,userResult)=>{
                    console.log(err)
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
   
       res.send(userResult)
})
                  
                })
               }
            })
        }


    })

}

module.exports=editRole