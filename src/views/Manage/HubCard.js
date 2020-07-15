import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import styled from 'styled-components';
import { fetchAllDevices, deleteDevice, createDevice } from "../../apis/device-api";
import { fetchAllHubs, createHub } from "../../apis/hub-api";
import DeviceCard from "./DeviceCard";
import ConnectionStatus from '../../components/ConnectionStatusPanel';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import LoadingPage from '../../components/LoadingPage';
import Modal from 'react-modal';
import { Col, Row, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";

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
  const [addModalVisible, setAddModalVisible] = useState(false);

  const showHub = () => setVisible(true);
  const hideHub = () => setVisible(false);

  const { _id, name, ipAddress, description, port } = props.hub;

  function showEditModalHandler() {
    setEditModalVisible(true);
  }

  function closeEditModalHandler() {
    setEditModalVisible(false);
  }

  function showDeleteModalHandler() {
    setDeleteModalVisible(true);
  }

  function closeDeleteModalHandler() {
    setDeleteModalVisible(false);
  }

  function closeAddModalHandler() {
    setAddModalVisible(false);
  }

  function showAddModalHandler() {
    setAddModalVisible(true);
  }

  function confirmDeleteHandler() {
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
            <IconButton onClick={showEditModalHandler} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={showAddModalHandler} aria-label="add">
              <AddIcon />
            </IconButton>
          </ButtonGroup>
        </HubCardInfoStyle>
        {props.devices.map((device) => <DeviceCard key={device._id} device={device} />)}

        <Modal isOpen={deleteModalVisible} onRequestClose={closeDeleteModalHandler} style={modalCustomStyles}>
          <DeleteModalContent hub={hub} onClose={closeDeleteModalHandler} />
        </Modal>

        <Modal isOpen={editModalVisible} onRequestClose={closeEditModalHandler} style={modalCustomStyles}>
          <EditModalContent hub={hub} onClose={closeEditModalHandler} />
        </Modal>

        <Modal isOpen={addModalVisible} onRequestClose={closeAddModalHandler} style={modalCustomStyles}>
          <AddModalContent hub={hub} onClose={closeAddModalHandler} />
        </Modal>
      </HubCardStyle>
    )
  }
}

const AddModalContent = (props) => {

  const GridStyle = styled.div`
    align-content: center;
    align-items:center;
    display: grid;
    /* width: 100;
    margin: 0; */
    text-align: center; 
    padding: 10px;
    font-size: 16pt;
    justify-items: center;
    grid-column-gap:10px;
    grid-row-gap:10px;
    grid-template-columns: 1fr; 
  `
  const FormStyle = styled.div`
    width: 100%;
    margin: 0 auto;
  `
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    data.hubId = props.hub._id;
    console.log(data);
    try {
      createDevice(data).then(res => {
        console.log(res);
        e.target.reset();
        props.onClose();
      });
    } catch{
      window.alert("Fail creating device.");
    }
  }; //form submit function which will invoke after successful validation

  return (
    <FormStyle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridStyle>
          <label>Name</label>
          <input name="name" defaultValue="" ref={register} />
          <label>Description</label>
          <input
            name="description"
            defaultValue="A device for"
            ref={register({ required: true })}
          />
          <label>IP address</label>
          <input
            name="ipAddress"
            defaultValue="192.168.56.1"
            ref={register({ required: true, maxLength: 20 })}
          />
          <label>Port</label>
          <input
            name="port"
            defaultValue="5000"
            ref={register({ required: true, maxLength: 4 })}
          />
          <input type="submit" />
        </GridStyle>
      </form>
    </FormStyle>
  );
}

const DeleteModalContent = (props) => {

  const deleteHubHandler = () => {
    try {
      // todo! delete hub
      props.onClose();
    } catch{
      window.alert("Fail deleting hub!");
    }
  }

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
          <Button variant="danger" onClick={deleteHubHandler}>Confirm</Button>
        </Col>
      </Row>
    </>
  )
}

const EditModalContent = (props) => {
  const GridStyle = styled.div`
    align-content: center;
    align-items:center;
    display: grid;
    /* width: 100;
    margin: 0; */
    text-align: center; 
    padding: 10px;
    font-size: 16pt;
    justify-items: center;
    grid-column-gap:10px;
    grid-row-gap:10px;
    grid-template-columns: 1fr; 
  `

  const FormStyle = styled.div`
    width: 100%;
    margin: 0 auto;
  `

  const { _id, name, ipAddress, port, description } = props.hub;
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    data.id = _id;
    console.log(data);
    try {
      // todo! edit hub api
      e.target.reset();
      props.onClose();
    } catch{
      console.log("Fail creating device.");
    }
  }; //form submit function which will invoke after successful validation

  return (
    <FormStyle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridStyle>
          <label>Name</label>
          <input name="name" defaultValue={name} ref={register} />

          <label>Description</label>
          <input
            name="description"
            defaultValue={description}
            ref={register({ required: true, maxLength: 50 })}
          />

          <label>IP address</label>
          <input
            name="ipAddress"
            defaultValue={ipAddress}
            ref={register({ required: true, maxLength: 20 })}
          />

          <label>Port</label>
          <input
            name="port"
            defaultValue={port}
            ref={register({ required: true, maxLength: 4 })}
          />
          <input type="submit" />
        </GridStyle>
      </form>
    </FormStyle>

  );
}