import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Practice(props) {
  const changeQuestion = () => props.changeQuestion();
  return (
    <>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Question</Accordion.Header>
          <div style={{ whiteSpace: "pre-wrap" }}>
            <Accordion.Body>{props.question}</Accordion.Body>
          </div>
        </Accordion.Item>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Your Answer</Form.Label>
            <Form.Control
              id="question"
              as="textarea"
              placeholder="Enter your Answer"
              style={{ height: "100px" }}
            />
          </Form.Group>
        </Form>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Actual Answer</Accordion.Header>
          <div style={{ whiteSpace: "pre-wrap" }}>
            <Accordion.Body>{props.answer}</Accordion.Body>
          </div>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Reference</Accordion.Header>
          <Accordion.Body>{props.reference}</Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Button
        variant="primary"
        type="submit"
        className="mt-3"
        onClick={changeQuestion}
      >
        Change Question
      </Button>
    </>
  );
}

export default Practice;
