import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import {sendCommand} from "../../assets/apis/backend-api"; 

const CommandBoardStyled = styled.div`
  display: grid; 
  grid-gap: 15px; 
  grid-template-columns:  repeat(auto-fill, minmax(100px, 1fr)); 
`

const onClickHandler = (content, sendCommand, deviceId) => {
  sendCommand("default", content, deviceId);
}

export default function (props) {
  return (
    <CommandBoardStyled>
      <Button onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command A</Button>
      <Button onClick={() => onClickHandler("B", sendCommand, props.device.id)}>Command B</Button>
      <Button onClick={() => onClickHandler("C", sendCommand, props.device.id)}>Command C</Button>
      <Button onClick={() => onClickHandler("D", sendCommand, props.device.id)}>Command D</Button>
      <Button onClick={() => onClickHandler("E", sendCommand, props.device.id)}>Command E</Button>
      <Button onClick={() => onClickHandler("F", sendCommand, props.device.id)}>Command F</Button>
    </CommandBoardStyled>
  );
};

