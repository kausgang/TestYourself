import React from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

function DbCardButton(props) {
  const addQuestion = () => props.addQuestion(props.title);
  const practice = () => props.practice(props.title);
  const showAll = () => props.showAll(props.title);

  return (
    <div>
      <ButtonToolbar aria-label="Toolbar with button groups">
        <Button className="m-1" variant="secondary" onClick={addQuestion}>
          + Question
        </Button>

        <Button className="m-1" variant="primary" onClick={practice}>
          Practice
        </Button>

        <Button className="m-1" variant="info" onClick={showAll}>
          Show All
        </Button>
      </ButtonToolbar>
    </div>
  );
}

export default DbCardButton;
