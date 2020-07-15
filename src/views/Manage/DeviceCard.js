import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import styled from 'styled-components';
import { fetchAllDevices, deleteDevice } from "../../apis/device-api";
import LinkButton from "../../components/LinkButton";
import Section from "../../components/Section";
import ConnectionStatus from '../../components/ConnectionStatusPanel';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { editDevice } from "../../apis/device-api";
import Modal from 'react-modal';

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
  color: black;
  text-align: left;
  align-items: center;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 3fr 2fr auto;
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

const ConnectionStatusStyle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
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

const EditDeviceForm = (props) => {
  const { _id, name, ipAddress, port, description } = props.device;
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    data.id = _id;
    console.log(data);
    try {
      editDevice(data).then(res => {
        console.log(res);
        e.target.reset();
        props.onClose();
      });
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
            ref={register({
              required: true, maxLength: 50,
              message: "Invalid description"
            })}
          />

          <label>IP address</label>
          <input
            name="ipAddress"
            defaultValue={ipAddress}
            ref={register({ required: true, maxLength: 20, message: "Invalid description" })}
          />

          <label>Port</label>
          <input
            name="port"
            defaultValue={port}
            ref={register({ required: true, maxLength: 4, message: "Port must not be larger than 4 digits" })}
          />
          <input type="submit" />
        </GridStyle>
      </form>
    </FormStyle>
  );
}

export default function (props) {
  const [visible, setVisible] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { _id, name, lastModified, value, ipAddress, description, port } = props.device;
  let history = useHistory();

  function deleteDeviceHandler() {
    try {
      deleteDevice(_id).then(() => {
        setVisible(false);
      }
      )
    } catch{
      // pop-up
      window.alert("Delete Fail!");
    }
  }

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

  function confirmDeleteHandler() {
    deleteDeviceHandler();
    setDeleteModalVisible(false);
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
        <ConnectionStatusStyle>
          <ConnectionStatus type='device' id={_id} />
        </ConnectionStatusStyle>
      </DeviceCardHeaderGrid>
      <DeviceCardInfoStyle>
        <div>{ipAddress}</div>
        <div>port: {port}</div>
        <div>Last Modified: {getLocalDateTimeString(lastModified)}</div>
        <div />
        <div>
          {/* <IconButton onClick={deleteDeviceHandler} aria-label="delete">
            <DeleteIcon />
          </IconButton> */}
          <IconButton onClick={showDeleteModalHandler} aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={showEditModalHandler} aria-label="edit">
            <EditIcon />
          </IconButton>
        </div>
      </DeviceCardInfoStyle>

      <Modal
        isOpen={editModalVisible}
        onRequestClose={closeEditModalHandler}
        style={modalCustomStyles}
        contentLabel="Edit Modal"
      >
        <EditDeviceForm device={props.device} onClose={closeEditModalHandler} />
      </Modal>

      <Modal
        isOpen={deleteModalVisible}
        onRequestClose={closeDeleteModalHandler}
        style={modalCustomStyles}
        contentLabel="Delete Modal"
        classname="delete-device-modal"
      >
        <div>
          <Row>
            <Col xs={12} md={12}>
              Confirm deleting the following device:
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4} style={{ fontWeight: 'bold' }}>
              {props.device.name}
            </Col>
          </Row>
        </div>
        <Row>
          <Col />
          <Col xs={6} md={4}>
            <Button variant="danger" onClick={confirmDeleteHandler}>Confirm</Button>
          </Col>
        </Row>
      </Modal>
    </DeviceCardContainer>
  )
}
