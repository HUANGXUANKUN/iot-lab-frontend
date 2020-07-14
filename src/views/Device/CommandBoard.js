import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { sendCommand } from "../../apis/command-api";

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
    <CommandBoardStyled class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command A</button>
        <button type="button" class="btn btn-secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command B</button>
        <button type="button" class="btn btn-secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command C</button>
        <button type="button" class="btn btn-secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command D</button>
        <button type="button" class="btn btn-secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command A</button>
        <button type="button" class="btn btn-secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command A</button>
        <button type="button" class="btn btn-secondary" onClick={() => onClickHandler("A", sendCommand, props.device.id)}>Command A</button>
    </CommandBoardStyled>
  );
};

