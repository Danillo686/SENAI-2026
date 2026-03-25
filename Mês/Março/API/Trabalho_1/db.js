const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    database: 'cria',
    port: '5433'
})

module.exports = pool
