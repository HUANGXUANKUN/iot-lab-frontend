import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';

const portAddress = 'http://localhost:5000/api';

const MAX_SELECTED = 10;
const TIME_UNITS = 10;

const fetchAllDevices = async () => {
  try {
    const link = portAddress + "/device/devices";
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
    const link = portAddress + "/device/get/"  + deviceId;
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

  const link = portAddress + "/device/edit";

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

  const link = portAddress + "/device/create";

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
  const link = portAddress + "/device/delete/" + deviceId;
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch(link, requestOptions);
    if(!response.ok) throw "Error "+ response.status + "! " +  response.statusText;
  } catch (err) {
    console.log(err);
    console.log("Fail to delete device");
    throw err;
  }
  console.log("Successfully deleted device");
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

export {
  fetchAllDevices,
  fetchDevice,
  getCurrentDataSet,
  createDevice,
  editDevice,
  deleteDevice,
};

