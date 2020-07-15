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
import LoadingPage from '../../components/LoadingPage';
import Modal from 'react-modal';
import { Col, Row, Button } from 'react-bootstrap';

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
const FormStyle = styled.div`
  width: 100%;
  margin: 0 auto;
`

const modalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '40px',
    transform: 'translate(-50%, -50%)'
  }
};

export default function HubCard(props) {
  const [visible, setVisible] = useState(true);
  const [hub, setHub] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const showHub = () => setVisible(true);
  const hideHub = () => setVisible(false);

  const { _id, name, ipAddress, description, port } = props.hub;

  function deleteHubHandler() {
    try {
      // delete hub
      hideHub();
    } catch{
      window.alert("Fail deleting hub!");
    }
  }

  function showEditModalHandler() {
    setEditModalVisible(true);
  }

  function closeEditModalHandler() {
    setEditModalVisible(false);
  }

  function showDeleteModalHandler() {
    window.alert("clicked delete modal");
    setDeleteModalVisible(true);
  }

  function closeDeleteModalHandler() {
    setDeleteModalVisible(false);
  }

  function confirmDeleteHandler() {
    deleteHubHandler();
    setDeleteModalVisible(false);
  }

  useEffect(() => {
    setHub(props.hub);
  }, [])

  if (props.hub === null) {
    return <LoadingPage />;
  }

  else {
    console.log("current devices: ", props.devices)
    return (
      visible && <HubCardStyle>
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
            <IconButton onClick={showDeleteModalHandler} aria-label="delete">
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
        <Modal
          isOpen={deleteModalVisible}
          onRequestClose={closeDeleteModalHandler}
          style={modalCustomStyles}
        >
          <DeleteModalContent hub={hub} confirmDeleteHandler={confirmDeleteHandler} />
        </Modal>
      </HubCardStyle>
    )
  }
}

const DeleteModalContent = (props) => {

  return (
    <>
      <div>
        <Row>
          <Col xs={12} md={12}>
            Confirm deleting the following hub:
            </Col>
        </Row>
        <Row>
          <Col xs={6} md={4} style={{ fontWeight: 'bold' }}>
            {props.hub.name}
          </Col>
        </Row>
      </div>
      <Row>
        <Col />
        <Col xs={6} md={4}>
          <Button variant="danger" onClick={props.confirmDeleteHandler}>Confirm</Button>
        </Col>
      </Row>
    </>
  )
}
