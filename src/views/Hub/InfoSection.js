import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getLocalDateTimeString } from "../../util/dateTimeParser";
import ConnectionStatusPanel from "../../components/ConnectionStatusPanel";
import Typography from "@material-ui/core/Typography";

const HubHeader = styled.div`
  font-size: 16px;
  text-align: left;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 80px;
`;

const SectionStyle = styled.div`
  display: grid;
  text-align: left;
  font-size: 12pt;
  justify-items: left;
  align-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin: 0px 10px;
`;

export default function (props) {
  const hub = props.hub;

  return (
    <>
      <HubHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "250px",
          }}
        >
          <h3>{hub.name}</h3>
        </div>
        <ConnectionStatusPanel style={{width:"150px"}}type="hub" hub={hub} />
      </HubHeader>
      <SectionStyle>
        <div>Description: </div>
        <div>{hub.description}</div>
        <div>IP Address: </div>
        <div>{hub.ipAddress}</div>
        <div>Port: </div>
        <div>{hub.port}</div>
        <div>Last Modified: </div>
        <div>{getLocalDateTimeString(hub.lastModified)}</div>
      </SectionStyle>
    </>
  );
}
