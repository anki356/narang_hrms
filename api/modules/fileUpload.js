const multer = require("multer")


const fileUpload=(upload,req,res,next)=>{
   
    upload.single('download')
next()
}
module.exports=fileUpload