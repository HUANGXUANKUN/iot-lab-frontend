import React, { useState, useEffect } from 'react';
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import styled from 'styled-components';
import { fetchAllDevices } from "../../assets/apis/backend-api";
import LinkButton from "../../components/LinkButton";
import Section from "../../components/Section";
import EditButton from "./EditButton";

const CardHeaderGrid = styled.div`
  display: grid;
  align-items: center;
  grid-column-gap: 10px;
  grid-template-columns: 2fr 1fr 2fr auto;
`;

const HeaderStyle = styled.div`
  color: #0366D6;
  font-size: 32px;
`;

const InfoStyle = styled.div`
  font-size: 12px;
  display: grid;
  margin: 10px;
  grid-column-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr auto;
`


const Item = (props) => {
  const { id, name, lastModified, value, ipAddress, description, port } = props.device;
  return (
    <Section>
      <CardHeaderGrid>
        <HeaderStyle>
          <LinkButton link={`/device/${id}`} text={name}></LinkButton>
        </HeaderStyle>
        <div>{description}</div>
      </CardHeaderGrid>
      <InfoStyle>
        <div>id: {id}</div>
        <div>value: {value}</div>
        <div>{ipAddress}</div>
        <div>port: {port}</div>
        <div>Last Modified: {getLocalDateTimeString(lastModified)}</div>
        <EditButton device={props.device} />
      </InfoStyle>
    </Section>
  )
}

const ItemList = (props) => {
  if (props.devices === null) {
    return <div> Loading data </div>
  }
  console.log("current devices: ", props.devices)
  return (
    props.devices.map((device) =>
      <Item key={device.id} device={device} />
    )
  )
}

const DeviceList = () => {
  const [devices, setDevices] = useState(null);

  useEffect(() => {
    try {
      fetchAllDevices().then(res => setDevices(res));
      console.log("devices data: ", this.state.devices);
    } catch{
      console.log("fail fetching data");
    }
  }, []);

  return (
    <div>
      {console.log("thisis devices: ", devices)}
      <ItemList devices={devices} />
    </div>
  )
}

export default DeviceList;