import React from "react";
import Accordion from "react-bootstrap/Accordion";

function QAAccordian(props) {
  return (
    <>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Question</Accordion.Header>
          <Accordion.Body>{props.question}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Answer</Accordion.Header>
          <Accordion.Body>{props.answer}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Reference</Accordion.Header>
          <Accordion.Body>{props.reference}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <br></br>
    </>
  );
}

export default QAAccordian;
