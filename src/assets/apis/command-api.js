import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';

const portAddress = 'http://localhost:5000/api';

const MAX_SELECTED = 10;
const TIME_UNITS = 10;

const sendCommand = async (type, content, deviceId) => {
  const link = portAddress + "/command/create";
  console.log("sending command " + type + ": " + content);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: type,
      content: content,
      deviceId: deviceId
    })
  };
  try {
    const response = await fetch(link, requestOptions);
  } catch (err) {
    console.log("Fail to send command");
  }
}

const pingDevice = async (id) => {
  const link = portAddress + "/command/device/ping/" + id;
  console.log("pinging device with id: " + id);
  const requestOptions = {
    method: 'GET',
  };
  let response;
  try {
    const response = await fetch(link, requestOptions);
    if(response.status === 200){
      console.log("Ping successfully! Device is connected!")
      return true;
    }else{
      return false;
    }
  } catch (err) {
    console.log("Fail connecting device!");
    return false;
  }
}

const pingHub = async (id) => {
  const link = portAddress + "/command/hub/ping/" + id;
  console.log("pinging hub with id: " + id);
  const requestOptions = {
    method: 'GET',
  };
  let response;
  try {
    const response = await fetch(link, requestOptions);
    if(response.status === 200){
      console.log("Ping successfully! Hub is connected!")
      return true;
    }else{
      return false;
    }
  } catch (err) {
    console.log("Fail connecting hub!");
    return false;
  }
}

export {
  sendCommand,
  pingDevice,
  pingHub,
};

