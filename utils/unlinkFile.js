
const fs =require('fs')
const path=require('path')
const unlinkFile=async(fileName)=>{
    
    fs.unlink(path.resolve()+"\\uploads\\"+""+fileName,(err,result)=>{
        return
    })
}
module.exports= unlinkFile