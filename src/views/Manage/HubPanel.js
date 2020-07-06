import React, { useState, useEffect } from 'react';
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import styled from 'styled-components';
import { fetchAllDevices } from "../../assets/apis/device-api";
import { fetchAllHubs } from "../../assets/apis/hub-api";
import LinkButton from "../../components/LinkButton";
import Section from "../../components/Section";
import EditButton from "./EditButton";
import HubCard from "./HubCard";

const HubList = (props) => {
  if (props.hubs === null) {
    return <div> Loading hubs </div>
  }
  else {
    console.log("current hubs: ", props.hubs)
    return (
      <div className="Hubs Section">
        {props.hubs.map((hub) =>
          <HubCard key={hub._id} hub = {hub} devices={hub.devices} />
        )}
      </div>
    )
  }
}

const HubPanel = () => {
  const [hubs, setHubs] = useState(null);
  useEffect(() => {
    try {
      fetchAllHubs().then(res => setHubs(res));
      console.log("Hubs data: ", this.state.hubs);
    } catch{
      console.log("fail fetching data");
    }
  }, []);

  return (
    <div>
      <HubList hubs={hubs} />
    </div>
  )
}

export default HubPanel;