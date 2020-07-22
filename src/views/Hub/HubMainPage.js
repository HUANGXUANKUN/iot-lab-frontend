import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { getDevice } from "../../apis/device-api";
import { getHub } from "../../apis/hub-api";
// import { pingDevice } from "../../apis/command-api";
import InfoSection from "./InfoSection";
// import DataChart from './DataChart';
// import CommandContainer from './CommandContainer';
import LoadingPage from "../../components/LoadingPage";
import Section from "../../components/Section";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import HubCard from "./HubCard";

const ContainerStyle = styled.div`
  display: flex;
`

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // padding: theme.spacing(2),
    margin: "10px",
    height: "90vh",
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

export default function () {
  const [hub, setHub] = useState(null);
  const hubId = useParams().hubId;
  const classes = useStyles();

  useEffect(() => {
    try {
      getHub(hubId).then((res) => {
        console.log(res);
        setHub(res);
      });
    } catch {
      console.log("Fail fetching hub with id: ", hubId);
    }
  }, []);

  if (!hub) {
    return <LoadingPage message="Loading hub data..." />;
  } else {
    return (
      <ContainerStyle>
          <Paper className={classes.paper}>
            <InfoSection hub={hub} />
          </Paper>
          <Paper className={classes.paper}>
            <HubCard hub={hub} />
          </Paper>
      </ContainerStyle>
    );
  }
}
