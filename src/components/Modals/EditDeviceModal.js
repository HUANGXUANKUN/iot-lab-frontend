import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

import { editDevice } from "../../apis/device-api";
import ErrorFormMessage from "../../components/Modals/ErrorFormMessage";

const modalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const GridStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  width: 300px;
  text-align: center;
  padding: 10px;
  font-size: 16pt;
  justify-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr;
`;

const EditDeviceForm = (props) => {
  const { _id, name, ipAddress, port, description } = props.device;
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    data.id = _id;
    editDevice(data)
      .then((res) => {
        console.log("editing device: ", props.device.name);
        console.log(res);
        e.target.reset();
        props.onClose();
        props.onSubmitForm(res);
      })
      .catch((err) => {
        alert(err.message);
      });
  }; //form submit function which will invoke after successful validation

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridStyle>
        <h3> Edit Device </h3>

        <label>Name</label>
        <input name="name" defaultValue={name} ref={register} />

        <label>Description</label>
        <input
          name="description"
          defaultValue={description}
          ref={register({
            required: true,
            message: "Invalid description",
          })}
        />

        <label>IP address</label>
        <input
          name="ipAddress"
          defaultValue={ipAddress}
          ref={register({
            required: true,
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
        <ErrorFormMessage errors={errors} />
      </GridStyle>
    </form>
  );
};

const EditDeviceModal = (props) => {
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
