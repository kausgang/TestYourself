import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Practice(props) {
  useEffect(() => {
    // clear your answer
    document.getElementById("yourAnswer").value = "";
  }, [props]);
  const changeQuestion = () => props.changeQuestion();

  return (
    <>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <strong>Question</strong>
          </Accordion.Header>
          <div style={{ whiteSpace: "pre-wrap" }}>
            <Accordion.Body>{props.question}</Accordion.Body>
          </div>
        </Accordion.Item>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Your Answer</strong>
            </Form.Label>
            <Form.Control
              id="yourAnswer"
              as="textarea"
              placeholder="Enter your Answer"
              style={{ height: "100px" }}
              className="bg-success p-2 text-dark bg-opacity-10"
            />
          </Form.Group>
        </Form>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <strong>Actual Answer</strong>
          </Accordion.Header>
          <div style={{ whiteSpace: "pre-wrap" }}>
            <Accordion.Body>{props.answer}</Accordion.Body>
          </div>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <strong>Reference</strong>
          </Accordion.Header>
          <Accordion.Body>{props.reference}</Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* <Button
        variant="primary"
        type="submit"
        className="mt-3"
        onClick={changeQuestion}
      >
        Change Question
      </Button> */}
    </>
  );
}

export default Practice;
