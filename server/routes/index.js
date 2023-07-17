var express = require("express");
var router = express.Router();

var sqlite3 = require("sqlite3");
const fs = require("fs");

/* GET home page. */
router.get("/showDBs", function (req, res, next) {
  const files = fs.readdirSync("./public/DB");
  res.send(files);
});

router.post("/createDB", function (req, res, next) {
  //get the DBname from client application
  let dbname = req.body.dbname;

  // create the database and tables
  let db = new sqlite3.Database("public/DB/" + dbname + ".db");
  db.run(
    "CREATE TABLE IF NOT EXISTS questions(ID INTEGER PRIMARY KEY AUTOINCREMENT,question,answer,reference)"
  );
  db.close();

  res.sendStatus(200);
});

router.post("/addQuestion", function (req, res, next) {
  //get the DBname from client application
  let dbname = req.body.dbname,
    question = req.body.question,
    answer = req.body.answer,
    reference = req.body.reference;

  console.log(dbname, question, answer, reference);

  // create the database and tables
  let db = new sqlite3.Database("public/DB/" + dbname);

  let data = [question, answer, reference];
  db.run(
    `INSERT INTO questions (question,answer,reference) VALUES (?,?,?)`,
    data,
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
  db.close();

  res.sendStatus(200);
});

router.get("/getQuestion", function (req, res, next) {
  //the request has to be in the form -http://localhost:3000/getQuestion?dbname=salesforce

  //get the DBname from client application
  let dbname = req.query.dbname;

  let db = new sqlite3.Database("public/DB/" + dbname);

  let sql = `SELECT * FROM questions`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    res.send(rows);
  });

  db.close();
});
module.exports = router;
