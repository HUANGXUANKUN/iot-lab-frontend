import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";
import { sendHubCommand, sendDeviceCommand } from "../../apis/command-api";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SendIcon from "@material-ui/icons/Send";

const ButtonStyle = styled.div`
  width: 80px;
  float: right;
`;

const ContainerStyle = styled.div`
  border: 2px solid yellow;
  display: flex;
  flex-direction: column;
  width:100%;
  height: 100%
`;

const PaperUpperStyle = styled.div`
  border: 2px solid purple;
  padding: 10px;
  background-color: white;
  height: ${(props) => Math.floor(window.innerHeight - 380) / 3}px;
  margin-bottom: 5px;
`;

const PaperBottomStyle = styled.div`
  border: 2px solid green;
  background-color: white;
  flex-grow: 1;
  margin-top: 5px;
  overflow: scroll;
  padding: 10px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "250px",
    },
  },
}));

const HubCommandBoard = (props) => {
  const classes = useStyles();
  const [deviceOptions, setDeviceOptions] = React.useState([]);
  const [textInput, setTextInput] = useState("");
  const [response, setReponse] = useState("");

  const handleTextChange = (event) => {
    console.log(event.target.value);
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hub: ", props.hub);
    console.log("textInput: ", textInput);
    sendHubCommand(props.hub, textInput)
      .then((res) => setReponse(res))
      .catch((err) => {
        // alert(err.message);
        setReponse(err.message);
      });
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <div style={{ display: "flex" }}>
          <TextField
            id="outlined-multiline-static"
            label="Query"
            size="small"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            onChange={handleTextChange}
          />
          <div
            style={{
              margin: "10px 0px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Button
              style={{ height: "40px", width: "80px" }}
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        </div>

        {response}
      </div>
    </form>
  );
};

function DeviceCommandBoard(props) {
  const classes = useStyles();
  const [deviceOptions, setDeviceOptions] = React.useState([]);
  const [currency, setCurrency] = React.useState("EUR");
  const [selectedDeviceOption, setSelectedDeviceOption] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [response, setReponse] = useState("");

  const handleOptionChange = (event) => {
    console.log(event.target.value);
    setSelectedDeviceOption(event.target.value);
  };
  const handleTextChange = (event) => {
    console.log(event.target.value);
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hub: ", props.hub);
    console.log("selectedDeviceOption: ", selectedDeviceOption);
    console.log("textInput: ", textInput);
    sendDeviceCommand(props.hub, selectedDeviceOption, textInput)
      .then((res) => setReponse(res))
      .catch((err) => {
        // alert(err.message);
        setReponse(err.message);
      });
  };

  useEffect(() => {
    const options = props.devices.map((device) => {
      return {
        label: device.name,
        value: device,
      };
    });
    console.log("options:", options);
    setDeviceOptions(options);
  }, [props.devices]);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select-currency"
          select
          size="small"
          label="Select"
          onChange={handleOptionChange}
          helperText="Please select a device"
        >
          {deviceOptions.map((option) => (
            <MenuItem key={"option-" + option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <div style={{ display: "flex" }}>
          <TextField
            id="outlined-multiline-static"
            label="Query"
            size="small"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            onChange={handleTextChange}
          />
          <div
            style={{
              margin: "10px 0px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Button
              style={{ height: "40px", width: "80px" }}
              size="small"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </div>
        </div>

        {response}
      </div>
    </form>
  );
}

const CommandBoard = (props) => {
  return (
    <ContainerStyle>
      <PaperUpperStyle>
        <HubCommandBoard hub={props.hub} />
      </PaperUpperStyle>
      <PaperBottomStyle>
        <DeviceCommandBoard hub={props.hub} devices={props.devices} />
      </PaperBottomStyle>
    </ContainerStyle>
  );
};

export default CommandBoard;
