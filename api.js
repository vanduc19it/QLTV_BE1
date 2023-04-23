const dataAPI = async (app, conn, sql) => {
  //get book by id
  const pool = await conn;

  app.post("/book/byID", async (req, res) => {
    const sqlString = "SELECT * FROM BOOK WHERE bookID = @bookID";
    await pool
      .request()
      .input("bookID", sql.Int, req.body.bookID)
      .query(sqlString, function (err, data) {
        res.send(data.recordsets[0][0]);
      });
  });

  //get borrow by studentid
  app.post("/borrow/studentID", async (req, res) => {
    const sqlString = "SELECT * FROM BORROWBOOK WHERE studentID = @studentID";
    await pool
      .request()
      .input("studentID", sql.Int, req.body.studentID)
      .query(sqlString, function (err, data) {
        res.send(data.recordsets[0]);
      });
  });

  //get student
  app.get("/students/get-all", async (req, res) => {
    const sqlString = "SELECT * FROM STUDENT";
    await pool.request().query(sqlString, function (err, data) {
      console.log(err, data);
      res.send(data.recordsets[0]);
    });
  });
  //get book
  app.get("/books/get-all", async (req, res) => {
    const sqlString = "SELECT * FROM BOOK";
    await pool.request().query(sqlString, function (err, data) {
      console.log(err, data);
      res.send(data.recordsets[0]);
    });
  });
  //get employee
  app.get("/employees/get-all", async (req, res) => {
    const sqlString = "SELECT * FROM EMPLOYEE";
    await pool.request().query(sqlString, function (err, data) {
      console.log(err, data);
      res.send(data.recordsets[0]);
    });
  });
  //get genre
  app.get("/genres/get-all", async (req, res) => {
    const sqlString = "SELECT * FROM BOOKGENRES";
    await pool.request().query(sqlString, function (err, data) {
      console.log(err, data);
      res.send(data.recordsets[0]);
    });
  });
  //get borrow
  app.get("/borrowing/get-all", async (req, res) => {
    const sqlString = "SELECT * FROM BORROWBOOK";
    await pool.request().query(sqlString, function (err, data) {
      console.log(err, data);
      res.send(data.recordsets[0]);
    });
  });

  //add new category
  app.post("/category/add-new", async (req, res) => {
    console.log(req, res);

    const sqlString =
      "INSERT INTO BOOKGENRES (genreName, description) VALUES(@genreName,@description)";
    console.log(req.body);
    await pool
      .request()
      .input("genreName", sql.NVarChar, req.body.genreName)
      .input("description", sql.NVarChar, req.body.description)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });
  //update category
  app.put("/category/update", async (req, res) => {
    const sqlString =
      "UPDATE BOOKGENRES SET genreName = @genreName, description = @description WHERE genreID = @genreID";
    console.log(req.body);
    await pool
      .request()
      .input("genreName", sql.NVarChar, req.body.genreName)
      .input("description", sql.NVarChar, req.body.description)
      .input("genreID", sql.Int, req.body.genreID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });
  //delete category by id
  app.delete("/category/delete/:genreID", async (req, res) => {
    const sqlString = "DELETE FROM BOOKGENRES WHERE genreID = @genreID";
    console.log("abc", req.body.genreID);
    await pool
      .request()
      .input("genreID", sql.Int, req.params.genreID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //add new book
  app.post("/book/add-new", async (req, res) => {
    console.log(req, res);

    const sqlString =
      "INSERT INTO BOOK (bookName,genreName,authorName,quantity,price,language,description, imageName) VALUES(@bookName,@genreName,@authorName,@quantity,@price,@language,@description, @imageName)";
    console.log(req.body);
    await pool
      .request()
      .input("bookName", sql.NVarChar, req.body.bookName)
      .input("genreName", sql.NVarChar, req.body.genreName)
      .input("authorName", sql.NVarChar, req.body.authorName)
      .input("quantity", sql.Int, req.body.quantity)
      .input("price", sql.Money, req.body.price)
      .input("language", sql.NVarChar, req.body.language)
      .input("description", sql.NVarChar, req.body.description)
      .input("imageName", sql.NVarChar, req.body.imageName)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //update book
  app.put("/book/update", async (req, res) => {
    console.log(req, res);

    const sqlString =
      "UPDATE BOOK SET bookName = @bookName, genreName = @genreName, authorName = @authorName, quantity = @quantity, price = @price, language = @language , description = @description, imageName = @imageName WHERE bookID = @bookID";
    console.log("day la", req.body.bookID);
    await pool
      .request()
      .input("bookName", sql.NVarChar, req.body.bookName)
      .input("genreName", sql.NVarChar, req.body.genreName)
      .input("authorName", sql.NVarChar, req.body.authorName)
      .input("quantity", sql.Int, req.body.quantity)
      .input("price", sql.Money, req.body.price)
      .input("language", sql.NVarChar, req.body.language)
      .input("description", sql.NVarChar, req.body.description)
      .input("imageName", sql.NVarChar, req.body.imageName)
      .input("bookID", sql.Int, req.body.bookID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //delete book by id
  app.delete("/book/delete/:bookID", async (req, res) => {
    const sqlString = "DELETE FROM BOOK WHERE bookID = @bookID";
    await pool
      .request()
      .input("bookID", sql.Int, req.params.bookID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //add new student
  app.post("/student/add-new", async (req, res) => {
    console.log(req, res);

    const sqlString =
      "INSERT INTO STUDENT (name,email,phone,class,department,gender,birthday,address,password,uniID,imageName) VALUES(@name,@email,@phone,@class,@department,@gender,@birthday,@address,@password,@uniID,@imageName)";
    console.log(req.body);
    await pool
      .request()
      .input("name", sql.NVarChar, req.body.name)
      .input("email", sql.NVarChar, req.body.email)
      .input("phone", sql.NVarChar, req.body.phone)
      .input("class", sql.NVarChar, req.body.class)
      .input("department", sql.NVarChar, req.body.department)
      .input("gender", sql.NVarChar, req.body.gender)
      .input("birthday", sql.Date, req.body.birthday)
      .input("address", sql.NVarChar, req.body.address)
      .input("password", sql.NVarChar, req.body.password)
      .input("uniID", sql.Int, req.body.uniID)
      .input("imageName", sql.NVarChar, req.body.imageName)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //update student
  app.put("/student/update", async (req, res) => {
    console.log(req, res);

    const sqlString =
      "UPDATE STUDENT SET name = @name, email = @email, phone = @phone, class= @class, department= @department, gender=@gender, birthday = @birthday, address = @address, uniID = @uniID, imageName = @imageName WHERE studentID = @studentID";
    console.log(
      "day la",
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.class,
      req.body.department,
      req.body.gender,
      req.body.birthday,
      req.body.address,
      req.body.uniID,
      req.body.imageName,
      req.body.i
    );
    await pool
      .request()
      .input("name", sql.NVarChar, req.body.name)
      .input("email", sql.NVarChar, req.body.email)
      .input("phone", sql.NVarChar, req.body.phone)
      .input("class", sql.NVarChar, req.body.class)
      .input("department", sql.NVarChar, req.body.department)
      .input("gender", sql.NVarChar, req.body.gender)
      .input("birthday", sql.Date, req.body.birthday)
      .input("address", sql.NVarChar, req.body.address)
      .input("uniID", sql.Int, req.body.uniID)
      .input("imageName", sql.NVarChar, req.body.imageName)
      .input("studentID", sql.Int, req.body.studentID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //delete student by id
  app.delete("/student/delete/:studentID", async (req, res) => {
    const sqlString = "DELETE FROM STUDENT WHERE studentID = @studentID";
    await pool
      .request()
      .input("studentID", sql.Int, req.params.studentID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //add new employee
  app.post("/employee/add-new", async (req, res) => {
    console.log(req, res);

    const sqlString =
      "INSERT INTO EMPLOYEE (name,email,birthday,gender,address,phone,salary,uniID, imageName) VALUES(@name,@email,@birthday,@gender,@address,@phone,@salary,@uniID, @imageName)";
    console.log(req.body);
    await pool
      .request()
      .input("name", sql.NVarChar, req.body.name)
      .input("email", sql.NVarChar, req.body.email)
      .input("birthday", sql.Date, req.body.birthday)
      .input("gender", sql.NVarChar, req.body.gender)
      .input("address", sql.NVarChar, req.body.address)
      .input("phone", sql.NVarChar, req.body.phone)
      .input("salary", sql.Money, req.body.salary)
      .input("uniID", sql.Int, req.body.uniID)
      .input("imageName", sql.NVarChar, req.body.imageName)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //update employee
  app.put("/employee/update", async (req, res) => {
    console.log(req, res);

    const sqlString =
      "UPDATE EMPLOYEE SET name = @name, email = @email, birthday = @birthday , gender = @gender , address = @address, phone = @phone, salary = @salary, uniID = @uniID, imageName = @imageName WHERE employeeID = @employeeID";
    console.log("day la", req.body.uniID, req.body.imageName);
    await pool
      .request()
      .input("name", sql.NVarChar, req.body.name)
      .input("email", sql.NVarChar, req.body.email)
      .input("birthday", sql.Date, req.body.birthday)
      .input("gender", sql.NVarChar, req.body.gender)
      .input("address", sql.NVarChar, req.body.address)
      .input("phone", sql.NVarChar, req.body.phone)
      .input("salary", sql.Money, req.body.salary)
      .input("uniID", sql.Int, req.body.uniID)
      .input("imageName", sql.NVarChar, req.body.imageName)
      .input("employeeID", sql.Int, req.body.employeeID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //delete employee by id
  app.delete("/employee/delete/:employeeID", async (req, res) => {
    const sqlString = "DELETE FROM EMPLOYEE WHERE employeeID = @employeeID";
    await pool
      .request()
      .input("employeeID", sql.Int, req.params.employeeID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //add new borrow
  app.post("/borrowing/add-new", async (req, res) => {
    console.log(req, res);

    const sqlString =
      "INSERT INTO BORROWBOOK (studentID,studentName,bookName,borrowDate,returnDate,quantity) VALUES(@studentID,@studentName,@bookName,@borrowDate,@returnDate,@quantity)";
    console.log(req.body);
    await pool
      .request()
      .input("studentID", sql.NVarChar, req.body.studentID)
      .input("studentName", sql.NVarChar, req.body.studentName)
      .input("bookName", sql.NVarChar, req.body.bookName)
      .input("borrowDate", sql.Date, req.body.borrowDate)
      .input("returnDate", sql.Date, req.body.returnDate)
      .input("quantity", sql.Int, req.body.quantity)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //update borrow
  app.put("/borrowing/update", async (req, res) => {
    console.log(req, res);

    const sqlString =
      "UPDATE BORROWBOOK SET studentName = @studentName, bookName = @bookName, borrowDate = @borrowDate , returnDate = @returnDate , quantity = @quantity WHERE borrowID = @borrowID";
    console.log("day la", req.body.studentName, req.body.studentName);
    await pool
      .request()
      .input("studentName", sql.NVarChar, req.body.studentName)
      .input("bookName", sql.NVarChar, req.body.bookName)
      .input("borrowDate", sql.Date, req.body.borrowDate)
      .input("returnDate", sql.Date, req.body.returnDate)
      .input("quantity", sql.Int, req.body.quantity)
      .input("borrowID", sql.Int, req.body.borrowID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });

  //delete borrow by id
  app.delete("/borrowing/delete/:borrowID", async (req, res) => {
    const sqlString = "DELETE FROM BORROWBOOK WHERE borrowID = @borrowID";
    await pool
      .request()
      .input("borrowID", sql.Int, req.params.borrowID)
      .query(sqlString, function (err, data) {
        res.send(data);
      });
  });
};

module.exports = dataAPI;
