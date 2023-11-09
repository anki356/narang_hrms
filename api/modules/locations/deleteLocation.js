const database=require('../../../config/database')

const deleteLocation=async(req,res,next)=>{
    const role_id = req.body.result.role_id
database.query("Select * from roles where id=" + role_id, (err, result) => {
    console.log(err)
    let allowed_roles = [ 'Super Admin']
    if (allowed_roles.includes(result[0].role_name)) {
    database.query("delete from locations where id="+req.params.id,(err,result)=>{
        console.log(err)
        database.query("delete from floors where location_id is null",(err,floorResult)=>{

            res.json({result,floorResult})
        })
    })
}
})
}
module.exports=deleteLocation