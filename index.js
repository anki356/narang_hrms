<<<<<<< HEAD
const http=require('http')
const app=require("./app/app")
const server=http.createServer(app)
const port = 4000;
=======
const http = require('http')
const app = require("./app/app")
const server = http.createServer(app)
const port = process.env.PORT || 9000;
>>>>>>> 62731efe311d1b7b2dcc70d4498add83a378503b
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});