import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import './App.css'
import Navbar from "./Component/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DbCard from "./Component/DbCard";
import SearchBar from "./Component/SearchBar";
import Stack from "react-bootstrap/Stack";

function App() {
  const urls = { showDBs: "http://localhost:4000/showDBs" };
  const [db, setDb] = useState([]);

  //if DB tab is clicked, fetch the list of dbs and show in cards
  const showDBs = (data) => {
    setDb(data.map((element, index) => <DbCard key={index} title={element} />));
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Navbar urls={urls} showDBs={showDBs} />
          </Col>
        </Row>
        <Row>
          <SearchBar />
        </Row>
        <Row>
          <Col className="m-4">
            <Stack gap={3}>{db}</Stack>
          </Col>
          <Col>
            Give add question form here. Visible only when Add question button
            is clicked
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
