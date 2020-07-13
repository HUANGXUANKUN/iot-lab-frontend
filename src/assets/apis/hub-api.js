import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';

const BACKEND_API_KEY = 'http://localhost:5000/api';

const MAX_SELECTED = 10;
const TIME_UNITS = 10;

const fetchAllHubs =  async () => {
  try {
    const link = BACKEND_API_KEY + "/hub/hubs";
    const response = await fetch(link);
    if(!response.ok) throw "Error " + response.status + "! " +response.statusText;
    const responseData = await response.json();
    let newItemList = responseData.hubs;
    console.log("Successfully fetched hubs!: ", newItemList);
    return newItemList;
  } catch (error) {
    console.log("Fail fetching hubs!");
    throw error;
  }
}
const createHub = async (hub) => {
  const { name, ipAddress, port, description } = hub;

  const link = BACKEND_API_KEY + "/hub/create";

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hub)
  };

  try {
    const response = await fetch(link, requestOptions);
    if(!response.ok) throw "Error " + response.status + "! " +response.statusText;
    return response;
  } catch (err) {
    console.log(err);
    console.log("Fail to send data");
    throw err;
  }
}

export {
  fetchAllHubs,
  createHub,
}