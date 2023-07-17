import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";

function Navbar(props) {
  const showDBs = () => {
    fetch(props.urls.showDBs)
      .then((res) => res.json())
      .then((data) => {
        props.showDBs(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        alert("Server Down");
      });
  };

  return (
    <div>
      <Nav
        variant="tabs"
        className="justify-content-center"
        // defaultActiveKey="/home"
      >
        <Nav.Item>
          <Nav.Link onClick={showDBs}>DB</Nav.Link>
        </Nav.Item>

        {/* <Nav.Item>
          <Nav.Link eventKey="link-1">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item> */}
      </Nav>
      {/* <div id="body">{rows}</div> */}
    </div>
  );
}

export default Navbar;
