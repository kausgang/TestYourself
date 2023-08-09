const { Configuration, OpenAIApi } = require("openai");

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

router.get("/getQuestionAll", function (req, res, next) {
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

router.get("/getQuestionOne", function (req, res, next) {
  //the request has to be in the form -http://localhost:3000/getQuestion?dbname=salesforce

  //get the DBname from client application
  let dbname = req.query.dbname;

  let db = new sqlite3.Database("public/DB/" + dbname);

  let sql = `SELECT * FROM questions`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }

    let randomElement = 0;
    if (rows.length !== 0) {
      randomElement = rows[Math.floor(Math.random() * rows.length)];
      res.send(randomElement);
    } else res.send(rows);
  });

  db.close();
});

router.post("/gpt", async function (req, res, next) {
  //get the DBname from client application
  let prompt = req.body.prompt;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "tell me a joke" },
    ],
  });
  // console.log(response.data.choices[0].message);

  res.status(200).send(response.data.choices[0].message);
  // res.send(JSON.stringify({ abc: "dasdasd" }));
});
module.exports = router;
