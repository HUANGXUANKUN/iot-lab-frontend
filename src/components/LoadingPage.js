import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';


const Container = styled.div`
  height: 100vh;
  position: relative;
`

const LoaderContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CenterBlock = styled.div`
  height: 10em;
  display: grid;
  align-items: center;
  justify-content: center;
`

export default function (props) {
  const [message, setMessage] = useState("Loading...");
  const [hasFailed, setHasFailed] = useState(false);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    if (props.message !== null) setMessage(props.message);
    if (props.hasFailed === true) {
      setMessage("Loading fails! Try to reload!");
      setHasFailed(props.hasFailed);
    }
    console.log(message);
    console.log(hasFailed);
  });

  return (
    <Container>
      <LoaderContainer>
        <CenterBlock>
          <Loader visible={!hasFailed} type="ThreeDots" color="#4f4f4f" height={80} width={80} style={{ width: "100px", marginLeft: "auto", marginRight: "auto" }} />
          <div>{message}</div>
          {hasFailed &&
            <Button onClick={refreshPage} variant="contained" style={{ width: "100px", marginLeft: "auto", marginRight: "auto" }}>Reload</Button>
          }
        </CenterBlock>
      </LoaderContainer>
    </Container>
  )
}