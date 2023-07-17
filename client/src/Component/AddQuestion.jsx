import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddQuestion() {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter Question"
          style={{ height: "100px" }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Answer</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Answer"
          style={{ height: "100px" }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Reference</Form.Label>
        <Form.Control type="text" placeholder="Reference" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddQuestion;
