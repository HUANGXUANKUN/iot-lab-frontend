import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';

// const API_KEY = 'http://localhost:5000/api';
const API_KEY = process.env.REACT_APP_BACKEND_API_KEY;

const MAX_SELECTED = 10;
const TIME_UNITS = 10;

const fetchAllDevices = async () => {
  try {
    const link = API_KEY + "/device/devices";
    const response = await fetch(link);
    const responseData = await response.json();
    if(!response.ok) throw Error(response.message);
    return responseData.devices;
  } catch (err) {
    console.log("fetch data failed!");
  }
}

const getDevice = async (deviceId) => {
  try {
    const link = API_KEY + "/device/get/"  + deviceId;
    const response = await fetch(link);
    if(!response.ok) throw Error(response.message);
    
    const responseData = await response.json();
    return responseData.device;
  } catch (err) {
    console.log("Fail to fetch data from device " + deviceId);
  }
}

const editDevice = async (device) => {
  const { id, name, ipAddress, port, description } = device;

  const link = API_KEY + "/device/update";

  const requestOptions = {
    method: 'PATCH',
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
    if(!response.ok) throw Error(response.message);
    const responseData = await response.json();
    return responseData.device;
  } catch (err) {
    console.log(err);
    console.log("Fail to send data");

  }
}

const createDevice = async (device) => {
  const { name, ipAddress, port, description, hubId } = device;

  const link = API_KEY + "/device/create";

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(device)
  };

  try {
    const response = await fetch(link, requestOptions);
    if(!response.ok) throw Error(response.message);
    console.log("Device created successfully!")
    const responseData = await response.json();
    return responseData.device;
  } catch (err) {
    throw err;
  }
}

const deleteDevice = async (deviceId) => {
  const link = API_KEY + "/device/delete/" + deviceId;
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch(link, requestOptions);
    if(!response.ok) throw Error(response.message);
    const responseData = await response.json();
    return responseData.device;
  } catch (err) {
    throw err;
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

export {
  fetchAllDevices,
  getCurrentDataSet,
  createDevice,
  editDevice,
  deleteDevice,
  getDevice,
};

