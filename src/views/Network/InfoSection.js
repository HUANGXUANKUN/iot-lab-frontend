import React from 'react';
import styled from 'styled-components';

const CurrentSelectedStyled = styled.h2`
  text-align: center;
`

const SectionStyle = styled.div`
  display: grid;
  text-align: center; 
  padding: 10px;
  font-size: 12pt;
  justify-items: left;
  grid-column-gap:10px;
  grid-row-gap:10px;
  grid-template-columns: 1fr 1fr; 
`
const DateStyle = styled.div`
  text-align: left; 
  font-style: italic;
  align-content: center;
  font-size: 10pt;
  margin: 5px;
  justify-items: left;
`
const TitleStyle = styled.div`
  font-weight: bold;
`

const Information = (props) => {
  return (
    <div>
      <CurrentSelectedStyled> {props.node.id} </CurrentSelectedStyled>
      <SectionStyle>
        <TitleStyle>Description: </TitleStyle>
        <div>{props.node.description}</div>
        <TitleStyle>IP Address: </TitleStyle>
        <div>{props.node.ipAddress}</div>
        {props.node.type === "DEVICE" &&
          <>
            <TitleStyle>Port: </TitleStyle>
            <div>{props.node.port}</div>
            <TitleStyle>Value: </TitleStyle>
            <div>{props.node.value}</div>
            <TitleStyle>Last Modified: </TitleStyle>
            <DateStyle>{(props.node.lastModified)}</DateStyle>
          </>
        }
      </SectionStyle>
    </div>
  )
}

export default function (props) {
  return (
    <>
      <Information node={props.node} />
    </>
  )
}