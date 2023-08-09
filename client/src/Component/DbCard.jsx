import React from "react";
import Card from "react-bootstrap/Card";
import DbCardButton from "./DbCardButton";

function DbCard(props) {
  const addQuestion = () => props.addQuestion(props.title);
  const practice = () => props.practice(props.title);
  const showAll = () => props.showAll(props.title);
  return (
    <Card
      // className="bg-danger p-2 text-dark bg-opacity-10"
      border="primary"
      style={{ width: "18rem" }}
    >
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>

        <DbCardButton
          addQuestion={addQuestion}
          practice={practice}
          showAll={showAll}
        />
      </Card.Body>
    </Card>
  );
}

export default DbCard;
