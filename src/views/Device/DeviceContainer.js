import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { fetchDevice } from "../../assets/apis/backend-api";
import DeviceInfoSection from "./DeviceInfoSection";
import DataChart from './DataChart';
import CommandContainer from './CommandContainer';

let globalSeconds = 0;

const InfoContainerGrid = styled.div`
  display: grid; 
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  grid-gap: 15px; 
  grid-template-columns: 3fr 5fr; 
`

const CommandContainerGrid = styled.div`
  display: block; 
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
`

export default function () {
  const [device, setDevice] = useState(null);
  const deviceId = useParams().deviceId;
  const [seconds, setSeconds] = useState(0);
  const [lastFetchSeconds, setLastFetchSeconds] = useState(0);
  const ref = React.useRef({
    seconds: 0
  });
  const refContainer = useRef(0);

  useEffect(() => {
    try {
      fetchDevice(deviceId).then((res) => {
        if (device) {
          const lastModified = device.lastModified;
          console.log("current last modified: ", lastModified);
          console.log("new last modified: ", res.lastModified);

          if (res.lastModified !== lastModified) {
            console.log("new data !");
            setDevice(res);
            setLastFetchSeconds(0);
          } else {
            console.log("No new data");
            setLastFetchSeconds(lastFetchSeconds => lastFetchSeconds + 5);
          }
        }
      })
    } catch{
      console.log("Fail fetching device with id: ", deviceId);
    }
  }, [seconds])

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds=>seconds+5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      fetchDevice(deviceId).then((res) => {
        setDevice(res);
      })
    } catch{
      console.log("Fail fetching device with id: ", deviceId);
    }
  }, [])

  const setDeviceHandler = () => {
    fetchDevice(deviceId).then((res) => {
      setDevice(res);
      setLastFetchSeconds(0);
    });
  }

  if (device) {
    return (
      <>
        <InfoContainerGrid>
          <DeviceInfoSection device={device} setDeviceHandler={setDeviceHandler} />
          <DataChart device={device} lastFetchSeconds={lastFetchSeconds} />
        </InfoContainerGrid>
        <CommandContainerGrid>
          <CommandContainer device={device} />
        </CommandContainerGrid>
      </>
    )
  }
  return (
    <div>Loading device data</div>
  )
}
