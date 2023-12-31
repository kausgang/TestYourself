import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";

function Navbar(props) {
  const showTextDBs = () => {
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

  // const showImageDBs = (e) => {
  //   navigator.clipboard.write([new ClipboardItem(navigator.clipboard.read())]);
  // };

  return (
    <div>
      <Nav
        variant="tabs"
        // className="justify-content-center"
        // defaultActiveKey="/home"
      >
        <Nav.Item>
          <Nav.Link onClick={showTextDBs}>Text Databases</Nav.Link>
        </Nav.Item>

        {/* <Nav.Item>
          <Nav.Link onClick={showImageDBs}>Image Databases</Nav.Link>
        </Nav.Item> */}
      </Nav>
      {/* <div id="body">{rows}</div> */}
    </div>
  );
}

export default Navbar;
