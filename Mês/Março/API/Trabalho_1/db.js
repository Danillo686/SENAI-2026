const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    database: 'cria', -> nome do banco de dados no PgAdmin
    port: '5433'
})

module.exports = pool
