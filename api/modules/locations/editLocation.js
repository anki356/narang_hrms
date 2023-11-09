const database = require("../../../config/database");
const mysql = require("mysql")
const editlocation = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        console.log(err)
        let allowed_roles = [ 'Super Admin']
        if (allowed_roles.includes(result[0].role_name)) { 
            let query="update locations set name="+mysql.escape(req.body.location)+" where id="+req.params.id
            database.query(query, (err, locationData, fields) => {
                database.query("select * from floors where location_id="+req.params.id,(err,floorData)=>{
                    let pr={}
                        pr.pr=new Promise((resolve,reject)=>{
                            pr.resolve=resolve
                            pr.reject=reject
                        })
                        var loopPromises=[]
                    if(req.body.floors>floorData.length){
                        
                        for(let i=0;i<parseInt((req.body.floors-floorData.length));i++){
loopPromises.push(pr.pr)
let name
if(Number(i)+Number(floorData.length)===0){
name="1st"
}
else if(Number(i)+Number(floorData.length)===1){
name="2nd"
}
else if(Number(i)+Number(floorData.length)===2){
name="3rd"
}
else{
name=(Number(i)+Number(floorData.length)+1)+"th"
}

database.query("insert into floors (name,location_id) values("+mysql.escape(name)+","+req.params.id+")",(err,floorResult)=>{
    pr.resolve(true)
                                    console.log(err)
                                })
                        }
                    }
                    else{
                        for(let i=0;i<parseInt((floorData.length-req.body.floors));i++){
                            loopPromises.push(pr.pr)
                            let name
                            if(Number(i)+Number(req.body.floors)===0){
                            name="1st"
                            }
                            else if(Number(i)+Number(req.body.floors)===1){
                            name="2nd"
                            }
                            else if(Number(i)+Number(req.body.floors)===2){
                            name="3rd"
                            }
                            else{
                            name=(Number(i)+Number(req.body.floors)+1)+"th"
                            }
                            
                            database.query("delete from floors where name="+mysql.escape(name),(err,floorResult)=>{
                                pr.resolve(true)
                                                                console.log(err)
                                                            })
                                                    }
                    }
                    Promise.all([loopPromises]).then(()=>{

                        res.send(locationData)                
                    })
                })
                
                console.log(err)
                
            })
        }
    })
}

module.exports=editlocation