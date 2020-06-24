import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

const ConfirmButtonStyled = styled.div`
  margin: 10px;
  padding: 5px;
  display: grid;
  justify-content: center;
`

const clickButtonHandler = (setDeviceHandler) => {
  setDeviceHandler();
}

export default function (props) {
  return (
    <ConfirmButtonStyled>
      <Button variant="primary" size="lg" onClick={() => clickButtonHandler(props.setDeviceHandler)}>
        Fetch Data
        </Button>
    </ConfirmButtonStyled>
  )
}
