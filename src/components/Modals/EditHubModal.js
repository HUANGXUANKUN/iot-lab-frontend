import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { updateHub } from "../../apis/hub-api";
import LoadingSection from "../../components/LoadingSection";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

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

const EditModalContent = (props) => {
  const { _id, name, ipAddress, port, description } = props.hub;
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    data.id = _id;
    updateHub(data)
      .then((res) => {
        props.onClose();
        props.onSubmitForm(res);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

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
};

const EditHubModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      style={modalCustomStyles}
    >
      <EditModalContent
        hub={props.hub}
        onClose={props.onClose}
        onSubmitForm={props.onSubmitForm}
      />
    </Modal>
  );
};

export default EditHubModal;
