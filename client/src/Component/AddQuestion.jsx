import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddQuestion(props) {
  const submitQuestion = () => {
    let question = document.getElementById("question").value;
    let answer = document.getElementById("answer").value;
    let reference = document.getElementById("reference").value;

    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
    document.getElementById("reference").value = "";

    // console.log(question, answer, reference);
    props.submitQuestion(question, answer, reference);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <Form.Control
          id="question"
          as="textarea"
          placeholder="Enter Question"
          style={{ height: "100px" }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          id="answer"
          as="textarea"
          placeholder="Answer"
          style={{ height: "100px" }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Reference</Form.Label>
        <Form.Control type="text" placeholder="Reference" id="reference" />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={submitQuestion}>
        Submit
      </Button>
    </Form>
  );
}

export default AddQuestion;
