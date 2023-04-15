require("dotenv").config()
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASWWORD,
        database:process.env.DATABASE,
        port:3307
    }
  });
  module.exports=knex