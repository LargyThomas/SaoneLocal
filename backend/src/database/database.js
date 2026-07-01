// require
const {Client} = require('pg')
require('dotenv').config()

// function
const connexion = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connexion.connect().then(() => console.log("connected"))

// export
module.exports = {connexion}