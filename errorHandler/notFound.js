
const notFound = (req,res) => {
      res.status(404).json({message:'requested route is not valid'});
}

module.exports= notFound;