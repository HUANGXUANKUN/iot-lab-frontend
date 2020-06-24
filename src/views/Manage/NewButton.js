import React from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

const ButtonStyled = styled.div`
  background-color: #2EA44F; 
  position: relative;
  margin-left: auto;
  margin-right: 20px;
  width: 50px;
  height: 20px;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 16px;
  &:hover {
    cursor: pointer; 
  }
  border-radius: 8px;
`

export default function (prop) {
  let history = useHistory();

  function handleClick() {
    history.push("/device/new");
  }

  return (
    <ButtonStyled color="green" onClick={handleClick}>
      New 
    </ButtonStyled>
  );
}