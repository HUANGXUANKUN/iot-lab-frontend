import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";

import { getLocalDateTimeString } from "../../util/dateTimeParser";
import truncate from "../../util/truncate";

const Container = styled.h2`
  width: 350px;
  margin: 10px;
`;

const HubHeader = styled.div`
  font-size: 16px;
  text-align: left;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 40px;
  margin: 20px 0px;
`;

const SectionStyle = styled.div`
  display: grid;
  text-align: left;
  font-size: 11pt;
  justify-items: left;
  align-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr 1fr;
  margin: 0px 10px;
`;

const HubLinkButton = (props) => {
  let history = useHistory();

  function handleClick() {
    history.push(props.link);
  }

  return (
    <Tooltip title={props.text} aria-label={"tooltip-name-" + props.text}>
      <Button color="inherit" onClick={handleClick}>
        <Typography color='primary' variant="h6"> {truncate(props.text, 20, true)}</Typography>
      </Button>
    </Tooltip>
  );
};

const Information = (props) => {
  const [type, setType] = useState(null);

  useEffect(() => {
    if (props.node !== null) setType(props.node.type);
  }, [props.node]);

  if (props.node === null) return <Container></Container>;
  else
    return (
      <Container>
        {props.node && props.node.type !== "center" && (
          <>
            <HubHeader>
              {type==="hub" ? 
              <Chip size="small" label={props.node.type} style={{width:"100px", backgroundColor:"green"}} color='primary'/>
              : 
              <Chip size="small" label={props.node.type} style={{width:"100px", backgroundColor:"#877CD6"}} color='primary'/>
            }
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "250px",
                }}
              >
                {
                  props.node.type === "hub" ?
                  <HubLinkButton link={"hub/" + props.node._id} text={props.node.id} />
                  :
                  <HubLinkButton link={"hub/" + props.node.hub} text={props.node.id} />
                }
              </div>
            </HubHeader>
            <SectionStyle>
              <div>Description: </div>
              <div>{truncate(props.node.description, 50, true)}</div>
              <div>Id: </div>
              <div>{props.node._id}</div>
              <div>IP Address: </div>
              <div>{props.node.ipAddress}</div>
              <div>Port: </div>
              <div>{props.node.port}</div>
              <div>Last Modified: </div>
              <div>{getLocalDateTimeString(props.node.lastModified)}</div>
              {props.node.type === "hub" && (
                <>
                  <div>Devices:</div>
                  {props.node.devices.map((device, index) => (
                    <>
                      {index !== 0 && <div/>}
                      <div key={"node-device-" + device._id}>
                        <Tooltip
                          title={device.description}
                          aria-label={"tooltip-device-name" + device._id}
                          placement="right"
                          >
                          <Typography
                            color="primary"
                            style={{ fontSize: "18px", textAlign: "left" }}
                            >
                            {truncate(device.name, 30, true)}
                          </Typography>
                        </Tooltip>
                      </div>
                    </>
                  ))}
                </>
              )}
              </SectionStyle>
          </>
        )}
      </Container>
    );
};

export default function (props) {
  return <Information node={props.node} />;
}
