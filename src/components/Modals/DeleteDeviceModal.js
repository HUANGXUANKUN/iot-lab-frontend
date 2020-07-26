import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import LoadingSection from "../LoadingSection";
import Modal from "react-modal";
import { Button, Row, Col } from "react-bootstrap";
import { deleteDevice } from "../../apis/device-api";

const modalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "40px",
    transform: "translate(-50%, -50%)",
  },
};

const DeleteDeviceForm = (props) => {
  const deleteDeviceHandler = () => {
    try {
      console.log("Deleting device...");
      deleteDevice(props.device._id).then((res) => {
        console.log("deleting device: ", props.device.name);
        props.onClose();
        props.onSubmitForm(res);
      });
    } catch {
      alert("Fail deleting hub!");
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col xs={12} md={12}>
            Confirm deleting the following hub:
          </Col>
        </Row>
        <Row>
          <Col xs={8} md={8} style={{ fontWeight: "bold" }}>
            {props.device.name}
          </Col>
        </Row>
      </div>
      <Row>
        <Col />
        <Col xs={6} md={4}>
          <Button variant="danger" onClick={deleteDeviceHandler}>
            Confirm
          </Button>
        </Col>
      </Row>
    </>
  );
};

const DeleteDeviceModal = (props) => {
  // console.log("Opening delete device modal for: ", props.device.name);
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={modalCustomStyles}
    >
      <DeleteDeviceForm
        device={props.device}
        onClose={props.onClose}
        onSubmitForm={props.onSubmitForm}
      />
    </Modal>
  );
};

export default DeleteDeviceModal;
