import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import styled from 'styled-components';
import { fetchAllDevices, deleteDevice } from "../../apis/device-api";
import { fetchAllHubs, createHub } from "../../apis/hub-api";
import LinkButton from "../../components/LinkButton";
import Section from "../../components/Section";
import EditButton from "./EditButton";
import DeviceCard from "./DeviceCard";
import ConnectionStatus from '../../components/ConnectionStatusPanel';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const HubCardStyle = styled.div`
  ${'' /* background-color: #FFFFFF;  */}
  background-color: #F1F8FF; 
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #C8E1FF;
  margin-left:20px;
  margin-right:20px;
  margin-top:10px;
  margin-bottom:20px;
  &:hover{
    background-color:#F1F8FF;
    transition:none;
  }
`

const HubCardContainer = styled.div`
  margin-left:5px;
  margin-right:5px;
  
`

const HubCardHeaderStyle = styled.div`
  margin: 10px;
  color: #0366D6;
  font-size: 32px;
  display: grid;
  align-items: center;
  grid-column-gap: 10px;
  justify-content: center;
  grid-template-columns: 1fr 6fr auto;
`;

const HubCardDescription = styled.div`
  color: #0366D6;
  font-size: 16px;
  text-align: left;
`
const HubCardInfoStyle = styled.div`
  margin: 10px;
  font-size: 10px;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 2fr 3fr;
`

const HeaderStyle = styled.div`
  color: #0366D6;
  font-size: 32px;
  font-weight: bold;
  width: 110px;
`;

const ConnectionStatusStyle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`

const ButtonGroup = styled.div`
  min-width: 200px;
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
`

export default function HubCard(props){
  const [hub, setHub] = useState(null);
  useEffect(() => {
    setHub(props.hub);
  }, [])

  if (props.hub === null) {
    return <div> Loading hub data</div>
  }

  else {
    console.log("current devices: ", props.devices)
    return (
      <HubCardStyle>
        <HubCardHeaderStyle>
          <HeaderStyle>{props.hub.name}</HeaderStyle>
          <HubCardDescription>{props.hub.description}</HubCardDescription>
          <div>
            <ConnectionStatusStyle>
              <ConnectionStatus type='hub' id={props.hub._id} />
            </ConnectionStatusStyle>
          </div>
        </HubCardHeaderStyle>
        <HubCardInfoStyle>
          <div>IP: {props.hub.ipAddress}</div>
          <div>PORT: {props.hub.port}</div>
          <div />
          <ButtonGroup>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="add">
              <AddIcon />
            </IconButton>
          </ButtonGroup>
        </HubCardInfoStyle>
        {props.devices.map((device) => <DeviceCard key={device._id} device={device} />)}
      </HubCardStyle>
    )
  }
}
