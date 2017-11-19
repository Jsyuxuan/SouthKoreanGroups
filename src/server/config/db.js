let mysql = require('mysql')
let client = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'gf_base'
})

module.exports = client
