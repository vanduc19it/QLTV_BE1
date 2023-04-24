const { conn, sql } = require("./connect2");
const express = require("express");
const dataAPI = require("./api");

const STR = "NITRO5-DUCIT\\MSSQLSERVER0";

var cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const configWithSeverDynamic = (uniID) => ({
  user: "sa",
  password: "123",
  server: `${STR}${uniID}`,
  database: "QLTHUVIEN2",
  //   port: 1433,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
});

//get login
app.post("/login", async (req, res) => {
  const pool = await conn;
  console.log(req.body.email, req.body.password);
  const sqlString =
    "SELECT * FROM STUDENT WHERE email = @email AND password = @password";
  await pool
    .request()
    .input("email", sql.NVarChar, req.body.email)
    .input("password", sql.NVarChar, req.body.password)
    .query(sqlString, function (err, data) {
      res.send(data.recordsets[0]);
    });
});

//get login admin
app.post("/admin/login", async (req, res) => {
  const pool = await conn;
  console.log(req.body.email, req.body.password);
  const sqlString =
    "SELECT * FROM ADMIN WHERE email = @email AND password = @password";
  await pool
    .request()
    .input("email", sql.NVarChar, req.body.email)
    .input("password", sql.NVarChar, req.body.password)
    .query(sqlString, function (err, data) {
      console.log(err, data);
      res.send(data.recordsets[0]);
      dataAPI(app, conn, sql);
    });
});

//get login employee
app.post("/employee/login", async (req, res) => {
  const pool = await conn;
  console.log(req.body.email, req.body.password);
  const sqlString =
    "SELECT * FROM EMPLOYEE WHERE email = @email AND password = @password";
  await pool
    .request()
    .input("email", sql.NVarChar, req.body.email)
    .input("password", sql.NVarChar, req.body.password)
    .query(sqlString, function (err, data) {
      res.send(data.recordsets[0]);
      const newConfig = configWithSeverDynamic(data.recordsets[0][0]?.uniID);
      dataAPI(app, newConfig, sql);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
