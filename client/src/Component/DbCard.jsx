import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

function DbCard(props) {
  const addQuestion = () => props.addQuestion(props.title);
  const practice = () => props.practice(props.title);
  const showAll = () => props.showAll(props.title);
  return (
    <Card style={{ width: "18rem" }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {/* <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text> */}
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup aria-label="First group">
            <Button variant="secondary" onClick={addQuestion}>
              Add Question
            </Button>
            {/* </ButtonGroup> */}
            {/* <ButtonGroup className="me-2" aria-label="First group"> */}
            <Button variant="primary" onClick={practice}>
              Practice
            </Button>
            {/* </ButtonGroup> */}
            {/* <ButtonGroup className="me-2" aria-label="First group"> */}
            <Button variant="info" onClick={showAll}>
              Show All
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        {/* <Card.Link onClick={props.addQuestion}>Add Question</Card.Link>
        <Card.Link href="#">Practice</Card.Link> */}
      </Card.Body>
    </Card>
  );
}

export default DbCard;
