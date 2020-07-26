import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { Button, Row, Col } from "react-bootstrap";

import { createDevice } from "../../apis/device-api";
import LoadingSection from "../LoadingSection";

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

const GridStyle = styled.div`
  align-content: center;
  align-items: center;
  display: grid;
  /* width: 100;
    margin: 0; */
  text-align: center;
  padding: 10px;
  font-size: 16pt;
  justify-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr;
`;

const FormStyle = styled.div`
  margin: 15px;
`;

const AddDeviceForm = (props) => {
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    data.hubId = props.hub._id;
    console.log(data);
    try {
      createDevice(data).then(res => {
        console.log(res);
        e.target.reset();
        props.onClose();
        props.onUpdate();
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

const EditDeviceModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={modalCustomStyles}
    >
      <AddDeviceForm
        hub={props.hub}
        onClose={props.onClose}
        onSubmitForm={props.onSubmitForm}
      />
    </Modal>
  );
};

export default AddDeviceForm;
