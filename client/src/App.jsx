import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import Navbar from "./Component/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DbCard from "./Component/DbCard";
import SearchBar from "./Component/SearchBar";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
import AddQuestion from "./Component/AddQuestion";
import Practice from "./Component/Practice";

function App() {
  const urls = {
    showDBs: "http://localhost:4000/showDBs",
    createDB: "http://localhost:4000/createDB",
    addQuestion: "http://localhost:4000/addQuestion",
    getQuestionOne: "http://localhost:4000/getQuestionOne",
    getQuestionAll: "http://localhost:4000/getQuestionAll",
  };
  const [db, setDb] = useState([]);
  const [viewAddQuestion, setViewAddQuestion] = useState(false);
  const [viewPractice, setViewPractice] = useState(false);
  const [selectedDB, setSelectedDB] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [reference, setReference] = useState("");

  //if DB tab is clicked, fetch the list of dbs and show in cards
  const showDBs = (data) => {
    setDb(
      data.map((element, index) => (
        <DbCard
          key={index}
          title={element}
          addQuestion={addQuestion}
          practice={practice}
        />
      ))
    );
  };

  //if search string is entered
  const onSearch = (search) => {
    console.log(search.target.value);
    let searchString = search.target.value;
  };

  // Example POST method implementation:
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
  }

  //on add db button
  const addDB = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Enter DB Information",

      html:
        '<input id="swal-input1" class="swal2-input" placeholder="DB name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="DB Description">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    //ADD VALIDATION FOR THE INPUT

    if (formValues) {
      // console.log(formValues);
      postData(urls.createDB, {
        dbname: formValues[0],
      })
        .then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
          if (data.status === 200) {
            Swal.fire({
              title: "DB created",
              icon: "success",
              confirmButtonText: "Ok",
            });
            //refresh dbcards
            fetch(urls.showDBs)
              .then((res) => res.json())
              .then((data) => {
                setDb(
                  data.map((element, index) => (
                    <DbCard
                      key={index}
                      title={element}
                      addQuestion={addQuestion}
                      practice={practice}
                    />
                  ))
                );
              })
              .catch((error) => {
                console.error(
                  "There has been a problem with your fetch operation:",
                  error
                );
              });
          }
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          alert("Server Down");
        });
    }
  };

  //on add question
  // show question form
  // collect db name
  const addQuestion = (selectedDB) => {
    console.log(selectedDB);
    setViewAddQuestion(true);
    setViewPractice(false);
    setSelectedDB(selectedDB);
  };

  //on practice
  // hide question window
  // make random question window visible
  // generate question
  const practice = async (selectedDB) => {
    setSelectedDB(selectedDB);

    setViewPractice(true);
    setViewAddQuestion(false);

    fetch(urls.getQuestionOne + "?dbname=" + selectedDB)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestion(data.question);
        setAnswer(data.answer);
        setReference(data.reference);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        alert("Server Down");
      });
  };

  const submitQuestion = async (question, answer, reference) => {
    postData(urls.addQuestion, {
      dbname: selectedDB,
      question,
      answer,
      reference,
    }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      if (data.status === 200) {
        Swal.fire({
          title: "Question Added",
          icon: "success",
          confirmButtonText: "Ok",
        });
      }
    });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Navbar urls={urls} showDBs={showDBs} />
          </Col>
        </Row>
        <Row>
          <Stack direction="horizontal" gap={3} className="mt-3">
            <SearchBar onSearch={onSearch} />
            <Button variant="primary" onClick={addDB}>
              Add DB
            </Button>
          </Stack>
        </Row>
        <Row>
          <Col className="m-4">
            <Stack gap={3}>{db}</Stack>
          </Col>
          <Col>
            <div hidden={viewAddQuestion ? false : true}>
              <AddQuestion
                viewAddQuestion={viewAddQuestion}
                submitQuestion={submitQuestion}
              />
            </div>
            <div hidden={viewPractice ? false : true}>
              <Practice
                question={question[0]}
                answer={answer[0]}
                reference={reference[0]}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
