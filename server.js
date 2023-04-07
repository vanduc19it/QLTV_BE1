
const {conn, sql} = require('./connect');
const express = require('express')

var cors = require('cors')
const router = express.Router()
const app = express()
app.use(cors()) 
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const pool = await conn;

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });


app.get('/student',async (req, res) => {
  const pool = await conn;
    const sqlString = "SELECT * FROM SINHVIEN"
    await pool.request().query(sqlString, function(err, data) {
        console.log(err, data)
        res.send(data.recordsets[0])
      });
    
})


app.post('/addCategory', async (req, res) => {
  const pool = await conn;
  const sqlString = "INSERT INTO DANHMUC (MaDanhMuc, TenDanhMuc) VALUES(@MaDanhMuc,@TenDanhMuc)"
  console.log(req.body) ; 
  await pool.request()
  .input('MaDanhMuc', sql.Int, req.body.MaDanhMuc)
  .input('TenDanhMuc', sql.NVarChar, req.body.TenDanhMuc)
  .query(sqlString, function (err,data) {
    res.send( data);
  });
    
    
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })