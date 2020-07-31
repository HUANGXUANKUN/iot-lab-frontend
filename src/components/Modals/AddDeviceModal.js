import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

import { createDevice } from "../../apis/device-api";
import LoadingSection from "../LoadingSection";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";
import ErrorFormMessage from "../../components/Modals/ErrorFormMessage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

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

const AddDeviceForm = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, watch, errors, reset } = useForm();

  const handleButtonClick = () => {
    setLoading(true);
    handleSubmit(onSubmit);
  };
  const onSubmit = (data, e) => {
    // setLoadingHandler(true);
    data.hubId = props.hub._id;
    console.log(data);
    createDevice(data)
      .then((res) => {
        console.log(res);
        e.target.reset();
        props.onSubmitForm(res);
        props.onClose();
      })
      .catch((err) => {
        alert(err.message);
      });
  }; //form submit function which will invoke after successful validation

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GridStyle>
        <h3> Add Device </h3>
        <label>Name</label>
        <input name="name" defaultValue="" ref={register({ required: true })} />
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
          ref={register({ required: true })}
        />
        <label>Port</label>
        <input
          name="port"
          defaultValue="5000"
          ref={register({ required: true })}
        />
        <div className={classes.root}>
          <div className={classes.wrapper}>
            <Button
              variant="contained"
              color="primary"
              // className={buttonClassname}
              disabled={loading}
              // onClick={handleButtonClick}
              type="submit"
            >
              Submit
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <ErrorFormMessage errors={errors} />
        </div>
      </GridStyle>
    </form>
  );
};

const AddDeviceModal = (props) => {
  if (props.hub) console.log(props.hub);
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

export default AddDeviceModal;
