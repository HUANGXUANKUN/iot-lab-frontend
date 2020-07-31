import React from "react";
import styled from "styled-components";
import { Jumbotron } from "react-bootstrap";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  height: 100%;
  width: 100%;
`;

const JumbotronSection = () => {
  return (
    <Jumbotron style={{ height: window.innerHeight - 50, width: "100%" }}>
      <Container>
        <div>
          <h1>Hello, weocome to IoT Dash!</h1>
          <p>
            This is a web app demo for iot device visualization and
            manipulation.
          </p>
        </div>
      </Container>
    </Jumbotron>
  );
};

export default function SlideIntroduction(props) {
  return (
    <>
      <JumbotronSection />
    </>
  );
}
