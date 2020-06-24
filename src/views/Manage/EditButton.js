import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const ButtonStyled = styled.div`
  background-color: #24292E; 
  position: relative;
  margin-left: auto;
  margin-right: 20px;
  width: 10px;
  height: 15px;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 10px;
  &:hover {
    cursor: pointer; 
  }
  border-radius: 8px;
`

export default function (props) {
  let history = useHistory();

  function handleClick() {
    history.push({
      pathname: '/device/edit',
      state: {device: props.device}
    });
  }

  return (
    <ButtonStyled color="green" onClick={handleClick}>
      Edit
    </ButtonStyled>
  );
}