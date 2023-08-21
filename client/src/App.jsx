import { useState, useEffect } from "react";
// import { process } from "process";
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
import QAAccordian from "./Component/QAAccordian";

import { urls } from "./URL/url";

function App() {
  // const urls = {
  //   showDBs: "http://localhost:4000/showDBs",
  //   createDB: "http://localhost:4000/createDB",
  //   addQuestion: "http://localhost:4000/addQuestion",
  //   getQuestionOne: "http://localhost:4000/getQuestionOne",
  //   getQuestionAll: "http://localhost:4000/getQuestionAll",
  //   gpt: "http://localhost:4000/gpt",
  // };

  const [db, setDb] = useState([]);
  const [viewAddQuestion, setViewAddQuestion] = useState(false);
  const [viewPractice, setViewPractice] = useState(false);
  const [viewShowAll, setViewShowAll] = useState(false);
  // const [viewHidedb, setViewHideDB] = useState(false);
  const [selectedDB, setSelectedDB] = useState("");
  const [id, setId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [reference, setReference] = useState("");
  const [showAllList, setShowAllList] = useState("");
  const [totalitem, setTotalitem] = useState("");

  //show the databases when the page loads
  useEffect(() => {
    fetch(urls.showDBs)
      .then((res) => res.json())
      .then((data) => {
        showDBs(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        alert("Server Down");
      });
  }, []);

  //if DB tab is clicked, fetch the list of dbs and show in cards
  const showDBs = (data) => {
    // setViewHideDB(true);

    setDb(
      data.map((element, index) => (
        <DbCard
          key={index}
          title={element}
          addQuestion={addQuestion}
          practice={practice}
          showAll={showAll}
        />
      ))
    );
  };

  // hide db
  // const hideDB = () => setViewHideDB(true);

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
            // refresh dbcards
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
                      showAll={showAll}
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
    setViewShowAll(false);
    setSelectedDB(selectedDB);
    setTotalitem("");
  };

  //on practice
  // hide question window
  // make random question window visible
  // generate question
  const practice = async (selectedDB) => {
    setSelectedDB(selectedDB);

    setViewPractice(true);
    setViewAddQuestion(false);
    setViewShowAll(false);

    setId("");
    setQuestion("");
    setAnswer("");
    setReference("");

    setTotalitem("");

    fetch(urls.getQuestionOne + "?dbname=" + selectedDB)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.length !== 0) {
          setId(data.ID);
          setQuestion(data.question);
          setAnswer(data.answer);
          setReference(data.reference);
        }
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

  const changeQuestion = async () => {
    setTotalitem("");
    fetch(urls.getQuestionOne + "?dbname=" + selectedDB)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setId(data.ID);
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

  const showAll = async (selectedDB) => {
    // console.log("implement showall");
    setViewAddQuestion(false);
    setViewPractice(false);
    setViewShowAll(true);

    setSelectedDB(selectedDB);

    fetch(urls.getQuestionAll + "?dbname=" + selectedDB)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setTotalitem(data.length);
        setShowAllList(
          data.map((item, index) => (
            <div key={index}>
              <QAAccordian
                key={index}
                question={item.question}
                answer={item.answer}
                reference={item.reference}
              />
              <Button
                variant="info"
                data-id={item.ID}
                data-question={item.question}
                data-db={selectedDB}
                onClick={updateSelected}
              >
                Update
              </Button>
              <hr />
            </div>
          ))
        );
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        alert("Server Down");
      });
  };

  const gpt = async () => {
    // get the context from user

    const { value: oldcontext } = await Swal.fire({
      input: "text",
      inputLabel:
        "You want GPT to be a _______________ while generating similar question",
      inputPlaceholder: "Type the context of the question here...",
      inputAttributes: {
        "aria-label": "What is the context of the question",
      },
      showCancelButton: false,
    });

    // if (context) {
    //   Swal.fire(context);
    // }

    setQuestion("Generating");
    setAnswer("");
    setReference("");

    let prompt =
      "Generate similar question based on the question given below - " +
      question;

    let context = "You are a helpful " + oldcontext;

    let data = { context, prompt };

    fetch(urls.gpt, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestion(data.content);
      });

    // postData(urls.gpt, data).then((data) => {
    //   console.log(data);
    // });
  };

  const updateQuestion = async (e) => {
    // let innerText = e.target.innerText;

    // // e.target.innerText === "Update"
    // //   ? (e.target.innerText = "Submit")
    // //   : (e.target.innerText = "Update");

    // // if (innerText === "Submit") {
    const { value: newquestion } = await Swal.fire({
      input: "textarea",
      inputLabel: question,
      inputPlaceholder:
        "Copy and Paste the Question from above and make necessary modification",
      // inputAttributes: {
      //   "aria-label": "What is the context of the question",
      // },
      showCancelButton: true,
    });

    let data = { selectedDB, id, newquestion };

    if (newquestion !== undefined) {
      fetch(urls.updateQuestion, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          setId(data.ID);
          setQuestion(data.question);
          setAnswer(data.answer);
          setReference(data.reference);
        });
    }

    // }
  };

  const updateSelected = async (e) => {
    const id = e.target.dataset.id;
    const question = e.target.dataset.question;
    const selectedDB = e.target.dataset.db;

    // console.log(selectedDB);

    // console.log("db=", selectedDB);

    const { value: newquestion } = await Swal.fire({
      input: "textarea",
      inputLabel: question,
      inputPlaceholder:
        "Copy and Paste the Question from above and make necessary modification",
      // inputAttributes: {
      //   "aria-label": "What is the context of the question",
      // },
      showCancelButton: true,
    });

    let data = { selectedDB, id, newquestion };

    console.log(newquestion);

    if (newquestion !== undefined) {
      fetch(urls.updateQuestion, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((response) => {
          // console.log(response.status);
          // response.json();

          if (response.status === 200)
            Swal.fire(
              "Updated!",
              "Show All Questions to see the update",
              "success"
            );
        })
        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          alert("Server Down");
        });
    }

    // .then((data) => {
    //   // console.log(data);

    //   // setId(data.ID);
    //   // setQuestion(data.question);
    //   // setAnswer(data.answer);
    //   // setReference(data.reference);
    // });
  };
  return (
    <>
      <Container>
        {/* <Row>
          <Col>
            <Navbar urls={urls} showDBs={showDBs} />
          </Col>
        </Row> */}
        <Row>
          <Stack direction="horizontal" gap={3} className="mt-3">
            {/* <SearchBar onSearch={onSearch} /> */}

            <Button variant="primary" onClick={addDB}>
              Add Database
            </Button>
          </Stack>
        </Row>
        <Row>
          <Col className="mt-3" xs={4}>
            <h6>
              Selected DB - <span className="text-danger">{selectedDB}</span>
            </h6>
            <em>
              # of Items - <span className="text-danger">{totalitem}</span>
            </em>
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
                question={question}
                answer={answer}
                reference={reference}
                changeQuestion={changeQuestion}
              />

              <Stack direction="horizontal" gap={3}>
                <Button
                  variant="success"
                  type="submit"
                  className="mt-3"
                  onClick={gpt}
                >
                  GPT
                </Button>

                <Button
                  variant="info"
                  type="submit"
                  className="mt-3"
                  onClick={updateQuestion}
                >
                  Update
                </Button>

                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3 ms-auto"
                  onClick={changeQuestion}
                >
                  Change Question
                </Button>
              </Stack>
            </div>
            <div hidden={viewShowAll ? false : true}>
              <ul>{showAllList}</ul>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
