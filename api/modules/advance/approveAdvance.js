const database = require("../../../config/database");
const approveAdvance = (req, res, next) => {
    const role_id = req.body.result.role_id
    database.query("Select * from roles where id=" + role_id, (err, result) => {
        if (err) console.log(err)
        let allowed_roles = ['Admin','Super Admin']
        if (allowed_roles.includes(result[0].role_name)) {
            
            database.query("update advance set status = 'Approved' where id="+req.params.id , (err, advanceData, fields) => {
                res.send(advanceData) 
                    
            })
        
        }



    })

}

module.exports=approveAdvance