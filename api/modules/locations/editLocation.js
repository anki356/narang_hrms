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
                    if(req.body.floors.length>floorData.length){
                        
                        for(let i=0;i<req.body.floors.length;i++){
loopPromises.push(pr.pr)


if(i>floorData.length-1){

    database.query("insert into floors (name,location_id) values("+mysql.escape(req.body.floors[i].floor_name)+","+req.params.id+")",(err,floorResult)=>{
        pr.resolve(true)
                                        console.log(err)
                                    })
}
else{
    database.query("update floors set name="+mysql.escape(req.body.floors[i].floor_name)+" where id="+floorData[i].id,(err,floorResult)=>{
        pr.resolve(true)
                                        console.log(err)
                                    })
}
                        }
                    }
                    else{

                        for(let i=0;i<parseInt((floorData.length));i++){
                            loopPromises.push(pr.pr)
                            if(i>req.body.floors.length-1){



                                database.query("delete from floors where id="+floorData[i].id,(err,floorResult)=>{
                                    pr.resolve(true)
                                                                    console.log(err)
                                                                })
                            }
                            else{
                                database.query("update floors set name="+mysql.escape(req.body.floors[i].floor_name)+" where id="+floorData[i].id,(err,floorResult)=>{
                                    pr.resolve(true)
                                                                    console.log(err)
                                                                })
                            }
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