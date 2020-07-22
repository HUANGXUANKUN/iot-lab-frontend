import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_BACKEND_API_KEY;

const fetchAllHubs =  async () => {
  try {
    const link = API_KEY + "/hub/hubs";
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

  const link = API_KEY + "/hub/create";

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hub)
  };

  try {
    const response = await fetch(link, requestOptions);
    if(!response.ok) throw "Error " + response.status + "! " +response.statusText;
    return response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const deleteHub = async (hubId) => {
  const link = API_KEY + "/hub/delete/" + hubId;
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch(link, requestOptions);
    if(!response.ok) throw "Error "+ response.status + "! " +  response.statusText;
  } catch (err) {
    console.log(err);
    console.log("Fail to delete hub");
    throw err;
  }
  console.log("Deleted hub successfully!");
}

const updateHub = async (hub) => {
  const { id, name, ipAddress, port, description } = hub;

  const link = API_KEY + "/hub/update";

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
  } catch (err) {
    console.log(err);
    console.log("Fail editing hub");
  }
}

const getHub = async (hubId) => {
  try {
    const link = API_KEY + "/hub/get/"  + hubId;
    const response = await fetch(link);
    const responseData = await response.json();
    console.log("Fetched new data");
    console.log(responseData.hub);
    return responseData.hub;
  } catch (err) {
    console.log("Fail to fetch data from hub " + hubId);
  }
}

export {
  fetchAllHubs,
  createHub,
  deleteHub,
  updateHub,
  getHub,
}