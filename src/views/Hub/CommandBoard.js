import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { sendHubCommand, sendDeviceCommand } from "../../apis/command-api";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import truncate from "../../assets/util/truncate";

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PaperUpperStyle = styled.div`
  height: ${(props) => Math.floor(window.innerHeight - 350) / 10 * 2}px;
  min-height: 170px;
  margin-bottom: 5px;
`;

const PaperBottomStyle = styled.div`
  min-height: 250px;
  flex-grow: 1;
  overflow: scroll;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "280px",
    },
  },
}));

const HubCommandBoard = (props) => {
  const classes = useStyles();
  const [deviceOptions, setDeviceOptions] = React.useState([]);
  const [textInput, setTextInput] = useState("");
  const [response, setReponse] = useState("");
  const [responseType, setReponseType] = useState("normal");

  const handleTextChange = (event) => {
    console.log(event.target.value);
    setTextInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hub: ", props.hub);
    console.log("textInput: ", textInput);
    sendHubCommand(props.hub, textInput)
      .then((res) => {setReponse(res);setReponseType("normal")})
      .catch((err) => {
        setReponse(err.message);
        setReponseType("error")
      });
  };

  return (
      <form className={classes.root} noValidate autoComplete="off">
        <h5 style={{marginLeft:"10px"}}>Hub Command</h5>
        <div>
          <div style={{ display: "flex" }}>
            <TextField
              id="outlined-multiline-static"
              label="Query"
              size="small"
              multiline
              rows={3}
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
                style={{ height: "40px", width: "80px", backgroundColor:"#FAFBFC" }}
                size="small"
                variant="contained"
                color="inherit"
                onClick={handleSubmit}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </div>
          </div>
          <Response response={response} type={responseType}/>
        </div>
      </form>
  );
};

function DeviceCommandBoard(props) {
  const classes = useStyles();
  const [deviceOptions, setDeviceOptions] = React.useState([]);
  const [selectedDeviceOption, setSelectedDeviceOption] = useState(null);
  const [textInput, setTextInput] = useState("");
  const [response, setReponse] = useState(null);
  const [responseType, setReponseType] = useState("normal");

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
    sendDeviceCommand(props.hub, selectedDeviceOption, textInput)
      .then((res) => {setReponse(res);
        setReponseType("Normal")
    })
      .catch((err) => {
        setReponse(err.message);
        setReponseType("error")
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
        <h5 style={{marginLeft:"10px"}}>Device Command</h5>
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
              rows={3}
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
                style={{ height: "40px", width: "80px", backgroundColor:"#FAFBFC" }}
                size="small"
                variant="contained"
                color="inherit"
                onClick={handleSubmit}
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </div>
          </div>
          <Response response={response} type={responseType}/>
        </div>
      </form>
  );
}

const Response = (props) => {
  const useStyles = makeStyles({
    root: {
      width: "100%",
      maxWidth: 500,
    },
  });
  const classes = useStyles();

  if (props.response === null || props.response === "") {
    return <></>;
  } else if (props.response && props.type === "error") {
    return (
      <div className={classes.root}>
        <Typography color="error" variant="body1">{truncate(props.response, 100, true)}</Typography>
      </div>
    );
  } else
    return (
      <div className={classes.root}>
        <Typography color="primary" variant="body1">{truncate(props.response, 100, true)}</Typography>
      </div>
    );
};

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
