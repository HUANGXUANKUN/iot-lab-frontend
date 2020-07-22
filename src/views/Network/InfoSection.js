import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getLocalDateTimeString } from "../../assets/util/dateTimeParser";
import LoadingSection from "../../components/LoadingSection";

const CurrentSelectedStyled = styled.div`
  text-align: center;
`;
const Container = styled.h2`
  width: 350px;
  margin: 10px;
`;

const SectionStyle = styled.div`
  display: grid;
  text-align: left;
  font-size: 12pt;
  justify-items: left;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr 1fr;
`;
const DateStyle = styled.div`
  text-align: left;
  font-style: italic;
  align-content: center;
  font-size: 10pt;
  justify-items: left;
`;
const TitleStyle = styled.div`
  font-weight: bold;
`;

const Information = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [node, setNode] = useState(null);

  useEffect(() => {
    setIsLoading(false);
  }, [props]);

  let deviceList;
  if (isLoading) return <LoadingSection />;
  else if (props.node === null) return <Container></Container>;
  else
    return (
      <Container>
        <CurrentSelectedStyled> {props.node.id} </CurrentSelectedStyled>
        {props.node.type !== "center" && (
          <SectionStyle>
            <TitleStyle>Description:</TitleStyle>
            <div>{props.node.description}</div>
            <TitleStyle>Id:</TitleStyle>
            <div>{props.node._id}</div>
            <TitleStyle>IP Address:</TitleStyle>
            <div>{props.node.ipAddress}</div>
            <TitleStyle>Port: </TitleStyle>
            <div>{props.node.port}</div>
            <TitleStyle>Last-Modified:</TitleStyle>
            <div>{getLocalDateTimeString(props.node.lastModified)}</div>
            {props.node.type === "hub" && (
              <>
                <TitleStyle>Devices:</TitleStyle>
                <div>
                  {props.node.devices.map((device) => (
                    <div key={"node-device-" + device._id}>{device.name}</div>
                  ))}
                </div>
              </>
            )}
          </SectionStyle>
        )}
      </Container>
    );
};

export default function (props) {
  return <Information node={props.node} />;
}
