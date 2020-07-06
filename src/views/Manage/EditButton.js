import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

const ButtonStyle = styled.div`
  position:relative;
  display:inline-block;
  justify-content: center;
  padding:5px 16px;
  min-width: 30px;
  max-width: 25px;
  min-height: 10px;
  max-height: 18px;
  font-size:14px;
  font-weight:500;
  line-height:20px;
  white-space:nowrap;
  vertical-align:middle;
  cursor:pointer;
  border:1px solid;
  border-radius:6px;
  -webkit-appearance:none;
  -moz-appearance:none;
  appearance:none;
  color:#fff;
  background-color:#807979;
  border-color:rgba(27,31,35,.15);
  box-shadow:0 1px 0 rgba(27,31,35,.1),inset 0 1px 0 hsla(0,0%,100%,.03);
  &:hover {
    background-color:#524d4d;
    transition-duration:.1s;
  }
  &:focus{box-shadow:0 0 0 3px rgba(46,164,79,.4);}
  &: disabled{
    color:#959da5;
    background-color:#fafbfc;
    border-color:rgba(27,31,35,.15);
  }
  &: active{
    background-color:#2e2c2c;
    box-shadow:inset 0 1px 0 rgba(20,70,32,.2);
    transition:none;
  }
`

export default function (props) {
  let history = useHistory();

  function handleClick() {
    history.push({
      pathname: props.link,
      state: { device: props.device }
    });
  }

  return (
    <ButtonStyle onClick={handleClick}>
      Edit
      <EditIcon />
    </ButtonStyle>
  );
}