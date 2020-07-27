import _ from "lodash";
import moment from "moment";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";

const API_KEY = process.env.REACT_APP_BACKEND_API_KEY;

const fetchValueFromDevice = async (hub, device) => {
  try {
    if (hub === null || device === null)
      throw Error("Missing hub or device argument");
    const baseLink =
      "http://" + hub.ipAddress + ":" + hub.port + "/fetch/device";
    const link = queryString.stringifyUrl({
      url: baseLink,
      query: {
        device_ip: device.ipAddress,
        device_port: device.port,
      },
    });
    console.log("link: ", link);
    let res = await axios({
      method: "get",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      url: link,
      timeout: 1000,
    });
    if (!res.status && res.status !== 200) throw new Error(res.error);
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const pingDevice = async (hub, device) => {
  const baseLink = "http://" + hub.ipAddress + ":" + hub.port + "/ping/device";
  const link = queryString.stringifyUrl({
    url: baseLink,
    query: {
      device_ip: device.ipAddress,
      device_port: device.port,
    },
  });
  console.log("link: ", link);
  try {
    let res = await axios({
      method: "get",
      url: link,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 5000,
    });
    console.log("res: ", res);
    return res;
  } catch (error) {
    console.log("error", error);
    console.log("error code: ", error.code);
    if (error.code === "ECONNABORTED") {
      console.log("Time out error!!");
      return { status: 408 };
    } else {
      return { status: 500 };
    }
  }
};

const pingHub = async (hub) => {
  const link = "http://" + hub.ipAddress + ":" + hub.port + "/ping/hub";
  try {
    let res = await axios({
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "get",
      url: link,
      timeout: 5000,
    });
    console.log("res: ", res);
    return res;
  } catch (error) {
    console.log("error", error);
    console.log("error code: ", error.code);
    if (error.code === "ECONNABORTED") {
      console.log("Time out error!!");
      return { status: 408 };
    } else {
      return { status: 500 };
    }
  }
};

const sendHubCommand = async (hub, query) => {
  const baseLink = "http://" + hub.ipAddress + ":" + hub.port + "/ping/device";
  const link = queryString.stringifyUrl({
    url: baseLink,
    query: {
      query: query,
    },
  });
  console.log("link: ", link);
  try {
    let res = await axios({
      method: "get",
      url: link,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 5000,
    });
    console.log("res: ", res);
    if (!res.status && res.status !== 200) throw new Error(res.error);
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const sendDeviceCommand = async (hub, device, query) => {
  const baseLink =
    "http://" + hub.ipAddress + ":" + hub.port + "/command/device";
  const link = queryString.stringifyUrl({
    url: baseLink,
    query: {
      device_ip: device.ipAddress,
      device_port: device.ipAddress,
      query: query,
    },
  });
  console.log("link: ", link);
  try {
    let res = await axios({
      method: "get",
      url: link,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 5000,
    });
    console.log("res: ", res);
    if (!res.status && res.status !== 200) throw new Error(res.error);
    return res.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export {
  sendHubCommand,
  sendDeviceCommand,
  fetchValueFromDevice,
  pingDevice,
  pingHub,
};
