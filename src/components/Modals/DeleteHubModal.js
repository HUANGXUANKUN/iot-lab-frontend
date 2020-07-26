import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import LoadingSection from "../../components/LoadingSection";
import Modal from "react-modal";
import { Button, Row, Col } from "react-bootstrap";
import { deleteHub } from "../../apis/hub-api";

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

const DeleteHubForm = (props) => {
  const deleteHubHandler = () => {
    try {
      console.log("Deleting Hub...");
      deleteHub(props.hub._id).then((res) => {
        props.onClose();
        props.onSubmitForm();
      });
        // props.onClose();
        // props.onSubmitForm();
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
            {props.hub.name}
          </Col>
        </Row>
      </div>
      <Row>
        <Col />
        <Col xs={6} md={4}>
          <Button variant="danger" onClick={deleteHubHandler}>
            Confirm
          </Button>
        </Col>
      </Row>
    </>
  );
};

const DeleteHubModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={modalCustomStyles}
    >
      <DeleteHubForm
        hub={props.hub}
        onClose={props.onClose}
        onSubmitForm={props.onSubmitForm}
      />
    </Modal>
  );
};

export default DeleteHubModal;
