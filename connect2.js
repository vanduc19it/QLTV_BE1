var sql = require("mssql/msnodesqlv8");
// var { roleData } = require("./singleton");

const config = {
  user: "sa",
  password: "123",
  server: "localhost" || "127.0.0.1",
  database: "QLTHUVIEN2",
  //   port: 1433,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

// let conn = null;
// console.log({ rolll: roleData.data });

conn = new sql.ConnectionPool(config).connect().then((pool) => {
  console.log("phung oi");
  return pool;
});

module.exports = {
  conn: conn,
  sql: sql,
};
