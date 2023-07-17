import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './Component/Navbar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DbCard from './Component/DbCard';



function App() {

  const urls={"showDBs":"http://localhost:4000/showDBs"}
  const [rows, setRows] = useState([]);

  const showDBs=(data)=>{
    setRows(
        data.map((element)=><DbCard title={element} />)
      )
  }

  return (
    <>
    <Container>
      <Row>
        <Col>
        <Navbar urls={urls} showDBs={showDBs}/>
        </Col>
      </Row>
      <Row>
        <Col>{rows}</Col>
      </Row>
    </Container>
      
    </>
  )
}

export default App
