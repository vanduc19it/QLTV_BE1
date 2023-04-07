var sql = require('mssql/msnodesqlv8');


 const config = {
  user: 'sa',
  password: '123',
  server: 'localhost'  || "127.0.0.1", 
  database: 'QLTHUVIEN',
//   port: 1433, 
  options: {
    "trustedConnection": true,
    "trustServerCertificate": true
  },

};

const conn = new sql.ConnectionPool(config).connect().then((pool)=> {
    return pool;
});


module.exports = {
    conn : conn,
    sql: sql,
}