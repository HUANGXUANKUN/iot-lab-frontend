import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import styled from 'styled-components';
import { fetchAllDevices, deleteDevice } from "../../assets/apis/device-api";
import { fetchAllHubs } from "../../assets/apis/hub-api";
import LinkButton from "../../components/LinkButton";
import Section from "../../components/Section";
import EditButton from "./EditButton";
import ConnectionStatus from '../../components/ConnectionStatusPanel';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const Container = styled.div`
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
  grid-template-columns: 1fr 3fr 2fr 1fr;
`;

const HubCardDescription = styled.div`
  color: #0366D6;
  font-size: 16px;
`
const HubCardInfoStyle = styled.div`
  margin: 10px;
  font-size: 10px;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 2fr 3fr auto;
`

const DeviceCardContainer = styled.div`
  background-color: #FFFFFF; 
  margin: 5px 5px;
  border: 1px solid #E1E4E8;
  border-radius: 8px 8px 8px 8px;
  &:hover{
    background-color:#F6F8FA;
    transition:none;
  }
`;

const DeviceCardHeaderGrid = styled.div`
  margin: 10px;
  display: grid;
  ${'' /* color: #0366D6; */}
  color: black;
  align-items: center;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 3fr 2fr 1fr;
`;

const DeviceCardInfoStyle = styled.div`
  margin: 10px;
  font-size: 12px;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 2fr 3fr auto;;
`
const HeaderStyle = styled.div`
  color: #0366D6;
  font-size: 32px;
  font-weight: bold;
`;

const DeviceCard = (props) => {
  const [visible, setVisible] = useState(true);
  const { _id, name, lastModified, value, ipAddress, description, port } = props.device;
  let history = useHistory();
  function editDeviceHandler() {
    history.push({
      pathname: "/device/edit",
      state: { device: props.device }
    });
  }

  function deleteDeviceHandler() {
    try {
      deleteDevice(_id).then(() => {
        setVisible(false);
      }
      )
    } catch{
      // pop-up
      console.log("POP-UP! Delete Fail!");
    }
  }

  return (
    visible &&
    <DeviceCardContainer>
      <DeviceCardHeaderGrid>
        <HeaderStyle>
          <LinkButton link={`/device/${_id}`} text={name}></LinkButton>
        </HeaderStyle>
        <div>{description}</div>
        <div />
        <ConnectionStatus type='device' id={_id} />
      </DeviceCardHeaderGrid>
      <DeviceCardInfoStyle>
        <div>{ipAddress}</div>
        <div>port: {port}</div>
        <div>Last Modified: {getLocalDateTimeString(lastModified)}</div>
        <div />
        <div>
          <IconButton onClick={deleteDeviceHandler} aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={editDeviceHandler} aria-label="edit">
            <EditIcon />
          </IconButton>
          {/* <EditButton link={"/device/edit"} deviceId={props.device._id} device={props.device} /> */}
        </div>
      </DeviceCardInfoStyle>
    </DeviceCardContainer>
  )
}



export default function (props) {
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
      <Container>
        <HubCardContainer>
          <HubCardHeaderStyle>
            <HeaderStyle>
              {props.hub.name}
            </HeaderStyle>
            <HubCardDescription>
              {props.hub.description}
            </HubCardDescription>
            <div />
            <ConnectionStatus type='hub' id={props.hub._id} />
          </HubCardHeaderStyle>
          <HubCardInfoStyle>
            <div>
              IP: {props.hub.ipAddress}
            </div>
            <div>
              PORT: {props.hub.port}
            </div>
            <div/>
          </HubCardInfoStyle>
        </HubCardContainer>
        {
          props.devices.map((device) =>
            <DeviceCard key={device._id} device={device} />
          )
        }
      </Container>
    )
  }
}
