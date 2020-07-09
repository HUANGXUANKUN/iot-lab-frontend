import React from 'react';
import styled from 'styled-components';
import UpdateButton from './UpdateButton';
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import Section from '../../components/Section';
import ConnectionStatusPanel from './../../components/ConnectionStatusPanel';

const CurrentSelectedStyled = styled.h2`
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr; 
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
export default function (props) {
  return (
    <Section>
      <CurrentSelectedStyled>
        {props.device.name}
        <ConnectionStatusPanel type="device" id={props.device._id} />
      </CurrentSelectedStyled>
      <SectionStyle>
        <TitleStyle>Value: </TitleStyle>
        <div>{props.device.value}</div>
        <TitleStyle>Description: </TitleStyle>
        <div>{props.device.description}</div>
        <TitleStyle>IP Address: </TitleStyle>
        <div>{props.device.ipAddress}</div>
        <TitleStyle>Port: </TitleStyle>
        <div>{props.device.port}</div>
        <TitleStyle>Last Modified: </TitleStyle>
        <DateStyle>{getLocalDateTimeString(props.device.lastModified)}</DateStyle>
      </SectionStyle>
      <UpdateButton setDeviceHandler={props.setDeviceHandler} />
    </Section>
  )
}
