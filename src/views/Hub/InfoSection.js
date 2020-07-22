import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import Section from '../../components/Section';
import ConnectionStatusPanel from '../../components/ConnectionStatusPanel';
import Typography from '@material-ui/core/Typography';

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

const ButtonGroup = styled.div`
  min-width: 200px;
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
`
export default function (props) {
  const hub = props.hub;

  return (
    <div>
      <CurrentSelectedStyled>
        {hub.name}
        <ConnectionStatusPanel type="hub" id={hub.id} />
      </CurrentSelectedStyled>
      <SectionStyle>
        <TitleStyle>Description: </TitleStyle>
        <div>{hub.description}</div>
        <TitleStyle>IP Address: </TitleStyle>
        <div>{hub.ipAddress}</div>
        <TitleStyle>Port: </TitleStyle>
        <div>{hub.port}</div>
        <TitleStyle>Last Modified: </TitleStyle>
        <DateStyle>{getLocalDateTimeString(hub.lastModified)}</DateStyle>
      </SectionStyle>
      </div>
  )
}
