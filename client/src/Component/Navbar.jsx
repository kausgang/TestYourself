import React,{useState,useEffect} from "react";
import Nav from "react-bootstrap/Nav";
import DbCard from "./DbCard";


function Navbar(props) {

  

  // useEffect(
  //   // rows.map((element)=><DbCard title={element} />)
  //   setRows()
  // )

  const showDBs=()=>{

   

    fetch(props.urls.showDBs)
        .then((res) => res.json())
        .then((data) => {
          console.log("data=", data);

       
          props.showDBs(data)
        // setRows(
        //   data.map((element)=><DbCard title={element} />)
        // )

          // // randomize the puzzles
          // // shuffleArray(data);
          // setGames(data);
          // setLoading(false);
        })
        .catch((error) => {
          
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
          alert("Server Down");
          // setLoading(false);
        });
  }


  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link onClick={showDBs}>DB</Nav.Link>
          {/* <ul style={{ listStyleType: "none" }}>{rows}</ul> */}
          
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
