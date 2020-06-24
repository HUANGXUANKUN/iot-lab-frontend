import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';

const portAddress = 'http://localhost:5000/api/';

const MAX_SELECTED = 10;
const TIME_UNITS = 10;

const fetchAllDevices = async () => {
  try {
    const link = portAddress + "devices";
    const response = await fetch(link);
    const responseData = await response.json();
    let newItemList = responseData.devices;
    console.log("fetch data success!: ", newItemList);
    return newItemList;
  } catch (err) {
    console.log("fetch data failed!");
  }
}

const fetchDevice = async (deviceId) => {
  try {
    const link = portAddress + "devices/device/" + deviceId;
    const response = await fetch(link);
    const responseData = await response.json();
    console.log("Fetched new data");
    console.log(responseData.device);
    return responseData.device;
  } catch (err) {
    console.log("Fail to fetch data from device " + deviceId);
  }
}

const editDevice = async (device) => {
  const { id, name, ipAddress, port, description } = device;

  const link = portAddress + "devices/device/edit";

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      name: name,
      ipAddress: ipAddress,
      port: port,
      description: description
    })
  };

  try {
    const response = await fetch(link, requestOptions);
  } catch (err) {
    console.log(err);
    console.log("Fail to send data");
  }
}

const createDevice = async (device) => {
  const { id, name, ipAddress, port, value, description } = device;

  const link = portAddress + "devices/device/create";

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: id,
      name: name,
      ipAddress: ipAddress,
      port: port,
      value: value,
      description: description,
    })
  };

  try {
    const response = await fetch(link, requestOptions);
  } catch (err) {
    console.log(err);
    console.log("Fail to send data");
  }
}


const deleteDevice = async (deviceId) => {
  const link = portAddress + "devices/device/update";

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: deviceId })
  };

  try {
    const response = await fetch(link, requestOptions);
  } catch (err) {
    console.log(err);
    console.log("Fail to delete device");
  }
}

const getCurrentDataSet = (historical) => {
  let currentHistorical = historical.slice(Math.max(currentHistorical.length - TIME_UNITS, 0));

  let currentDataSet = [
    {
      data: currentHistorical.map((set, index) => {
        const localDateTime = new Date(Number(set.lastModified)).toString();
        console.log(localDateTime);
        return ([
          localDateTime, set.value
        ]);
      })
    }
  ]

  console.log("current data set is ", currentDataSet);
  return currentDataSet;
}

const sendCommand = async (type, content, deviceId) => {
  const link = portAddress + "command/create";
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

export {
  fetchAllDevices,
  fetchDevice,
  getCurrentDataSet,
  sendCommand,
  createDevice,
  editDevice,
};

