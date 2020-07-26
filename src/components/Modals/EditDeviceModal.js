import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { Button, Row, Col } from "react-bootstrap";

import { editDevice } from "../../apis/device-api";
import LoadingSection from "../../components/LoadingSection";

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

const EditDeviceForm = (props) => {
  const { _id, name, ipAddress, port, description } = props.device;
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    data.id = _id;
    console.log(data);
    try {
      editDevice(data).then((res) => {
        console.log("editing device: ", props.device.name);
        console.log(res);
        e.target.reset();
        props.onClose();
        props.onSubmitForm(res);
      });
    } catch {
      alert("Fail editing device!");
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
              required: true,
              maxLength: 50,
              message: "Invalid description",
            })}
          />

          <label>IP address</label>
          <input
            name="ipAddress"
            defaultValue={ipAddress}
            ref={register({
              required: true,
              maxLength: 20,
              message: "Invalid description",
            })}
          />

          <label>Port</label>
          <input
            name="port"
            defaultValue={port}
            ref={register({
              required: true,
              maxLength: 4,
              message: "Port must not be larger than 4 digits",
            })}
          />
          <input type="submit" />
        </GridStyle>
      </form>
    </FormStyle>
  );
};

const EditDeviceModal = (props) => {
  // console.log("opening edit device modal for :", props.device.name);
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={modalCustomStyles}
    >
      <EditDeviceForm
        device={props.device}
        onClose={props.onClose}
        onSubmitForm={props.onSubmitForm}
      />
    </Modal>
  );
};

export default EditDeviceModal;
