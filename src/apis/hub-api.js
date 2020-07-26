import _ from "lodash";
import moment from "moment";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";

const API_KEY = process.env.REACT_APP_BACKEND_API_KEY;

const fetchAllHubs = async () => {
  try {
    const link = API_KEY + "/hub/hubs";
    const response = await fetch(link);
    if (!response.ok) throw Error(response.message);
    const responseData = await response.json();
    return responseData.hubs;
  } catch (error) {
    console.log("Fail fetching hubs!");
    throw error;
  }
};

const createHub = async (hub) => {
  const { name, ipAddress, port, description } = hub;

  const link = API_KEY + "/hub/create";

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hub),
  };

  try {
    const response = await fetch(link, requestOptions);
    if (!response.ok) throw Error(response.message);
    const responseData = await response.json();
    return responseData.hub;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteHub = async (hubId) => {
  const link = API_KEY + "/hub/delete/" + hubId;
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(link, requestOptions);
    if (!response.ok) throw Error(response.message);
    const responseData = await response.json();
    return responseData.hub;
  } catch (err) {
    console.log("Fail to delete hub");
    throw err;
  }
  console.log("Deleted hub successfully!");
};

const updateHub = async (hub) => {
  const { id, name, ipAddress, port, description } = hub;

  const link = API_KEY + "/hub/update";

  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      name: name,
      ipAddress: ipAddress,
      port: port,
      description: description,
    }),
  };

  try {
    const response = await fetch(link, requestOptions);
    const responseData = await response.json();
    if (!response.ok) throw Error(response.message);
    return responseData.hub;
  } catch (err) {
    console.log("Fail editing hub");
    throw err;
  }
};

const getHub = async (hubId) => {
  try {
    const link = API_KEY + "/hub/get/" + hubId;
    const response = await fetch(link);
    const responseData = await response.json();
    if (!response.ok) throw Error(response.message);
    return responseData.hub;
  } catch (err) {
    console.log("Fail to fetch data from hub " + hubId);
    throw err;
  }
};

export { fetchAllHubs, createHub, deleteHub, updateHub, getHub };
