const database = require("../../../config/database");
const mysql = require("mysql")
const addLocation = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        console.log(err)
        let allowed_roles = [ 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            database.query("Insert Into locations (name) values ("+mysql.escape(req.body.location)+")",(err,result)=>{
                if (req.body.floors!==null){
                    let pr={}
                    pr.pr=new Promise((resolve,reject)=>{
                        pr.resolve=resolve
                        pr.reject=reject
                    })
                    var loopPromises=[]
                    for(let i=0;i<req.body.floors;i++){
                        loopPromises.push(pr.pr)
                        let name
                        if(i===0){
name="1st"
                        }
                        else if(i===1){
                        name="2nd"
                        }
                        else if(i===2){
                        name="3rd"
                        }
else{
    name=(Number(i)+1)+"th"
}
                            database.query("insert into floors (name,location_id) values("+mysql.escape(name)+","+result.insertId+")",(err,floorResult)=>{
pr.resolve(true)
                                console.log(err)
                            })
                        }
                        Promise.all([loopPromises]).then(()=>{

                            res.send(result)                
                        })
                    }
                 else{
                    res.send(result)        
                 }   
            
            })
        }
    })
}
module.exports=addLocation