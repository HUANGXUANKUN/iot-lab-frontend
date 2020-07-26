import React from 'react';
import styled from 'styled-components';

const NewButton = styled.div`
  position:relative;
  display:inline-block;
  padding:5px 16px;
  min-width: 30px;
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
  background-color:#2ea44f;
  border-color:rgba(27,31,35,.15);
  box-shadow:0 1px 0 rgba(27,31,35,.1),inset 0 1px 0 hsla(0,0%,100%,.03);
  &:hover {
    background-color:#2c974b;
    transition-duration:.1s;
  }
  &:focus{box-shadow:0 0 0 3px rgba(46,164,79,.4);}
  &: disabled{
    color:#959da5;
    background-color:#fafbfc;
    border-color:rgba(27,31,35,.15);
  }
  &: active{
    background-color:#2a8f47;
    box-shadow:inset 0 1px 0 rgba(20,70,32,.2);
    transition:none;
  }
`

export default function (props) {
  return (
    <NewButton onClick = {props.onClick}>
      {props.children}
    </NewButton>
  );
}