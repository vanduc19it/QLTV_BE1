var sql = require("mssql/msnodesqlv8");
// var { roleData } = require("./singleton");

const fs = require("fs");
const data = fs.readFileSync("data.txt", "utf-8");

const roleData = JSON.parse(data)[0];

const STR = "NITRO5-DUCIT\\MSSQLSERVER";

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

const configWithSever1 = {
  user: "sa",
  password: "123",
  server: "NITRO5-DUCIT\\MSSQLSERVER01",
  database: "QLTHUVIEN2",
  //   port: 1433,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};
const configWithSever2 = {
  user: "sa",
  password: "123",
  server: "NITRO5-DUCIT\\MSSQLSERVER02",
  database: "QLTHUVIEN2",
  //   port: 1433,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};
const configWithSever3 = {
  user: "sa",
  password: "123",
  server: "NITRO5-DUCIT\\MSSQLSERVER03",
  database: "QLTHUVIEN2",
  //   port: 1433,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};
const configWithSever4 = {
  user: "sa",
  password: "123",
  server: "NITRO5-DUCIT\\MSSQLSERVER04",
  database: "QLTHUVIEN2",
  //   port: 1433,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

const configWithSeverDynamic = (serverID) => ({
  user: "sa",
  password: "123",
  server: `${STR}${serverID}`,
  database: "QLTHUVIEN2",
  //   port: 1433,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
});
// let conn = null;
// console.log({ rolll: roleData.data });

if (roleData.role == 1) {
  conn = new sql.ConnectionPool(config).connect().then((pool) => {
    return pool;
  });
} else if (roleData.role == 2 && roleData.uniID == 1) {
  conn = new sql.ConnectionPool(configWithSever1).connect().then((pool) => {
    return pool;
  });
} else if (roleData.role == 2 && roleData.uniID == 2) {
  conn = new sql.ConnectionPool(configWithSever2).connect().then((pool) => {
    return pool;
  });
} else if (roleData.role == 2 && roleData.uniID == 3) {
  conn = new sql.ConnectionPool(configWithSever3).connect().then((pool) => {
    return pool;
  });
} else if (roleData.role == 2 && roleData.uniID == 4) {
  conn = new sql.ConnectionPool(configWithSever4).connect().then((pool) => {
    return pool;
  });
} else {
  conn = new sql.ConnectionPool(config).connect().then((pool) => {
    return pool;
  });
}

module.exports = {
  conn: conn,
  sql: sql,
};
