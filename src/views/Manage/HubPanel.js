import React, { useState, useEffect } from 'react';
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import styled from 'styled-components';
import { fetchAllDevices } from "../../apis/device-api";
import { fetchAllHubs } from "../../apis/hub-api";
import LinkButton from "../../components/LinkButton";
import Section from "../../components/Section";
import EditButton from "./EditButton";
import HubCard from "./HubCard";
import LoadingPage from '../../components/LoadingPage';

const Container = styled.div`
 overflow: auto;
 height: 90vh;
`

const HubList = (props) => {
  if (props.hubs === null) {
    return <LoadingPage />
  }
  else {
    console.log("current hubs: ", props.hubs)
    return (
      <Container className="Hubs Section">
        {props.hubs.map((hub) =>
          <HubCard key={hub._id} hub={hub} />
        )}
      </Container>
    )
  }
}

const HubPanel = (props) => {
  return (
    <Container>
      <HubList hubs={props.hubs} />
    </Container>
  )
}

export default HubPanel;