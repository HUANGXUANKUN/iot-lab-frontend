import _ from "lodash";
import moment from "moment";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";

const API_KEY = process.env.REACT_APP_BACKEND_API_KEY;

const fetchValueFromDevice = async (hub, device, query) => {
  //http://10.110.108.229:5000/fetch/device?device_ip=128:0:0:0&device_port=3000&query=fetch
  const baseLink = "http://" + hub.ipAddress + ":" + hub.port + "/fetch/device";
  const link = queryString.stringifyUrl({
    url: baseLink,
    query: {
      device_ip: device.ipAddress,
      device_port: device.port,
      query: query,
    },
  });
  console.log("link: ", link);
  try {
    let res = await axios({
      method: "get",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: link,
      timeout: 5000,
    });
    const responseData = await res.json();
    if (!res.ok) throw new Error(responseData.message);
    return responseData;
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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

export { fetchValueFromDevice, pingDevice, pingHub };
