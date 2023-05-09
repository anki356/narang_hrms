const fs=require('fs')
const uploadFile=(req,res,next)=>{
    var query = req.body;
    var imgData = query.download;
    
    var exten = imgData
      .match(/data(.*),/g)[0]
      .replace(",", "")
      .split("/")[1]
      .split(";")[0];
    var base64Data = imgData.replace(/^data(.*);base64,/, "");
    var name = Date.now() + "download." + exten;
    var fullPath = "./uploads/" + name;
    fs.writeFile(fullPath, base64Data, "base64", function(
      err,
      data
    ) {
        
      if (err) {
        console.log("err", err);
      }
      console.log("data",data);
    });
    req.body.file=fullPath
    next()
}
module.exports =uploadFile

