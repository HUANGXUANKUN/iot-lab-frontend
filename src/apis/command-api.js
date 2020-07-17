import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_BACKEND_API_KEY;
const MAX_SELECTED = 10;
const TIME_UNITS = 10;

const sendCommand = async (type, content, hubId) => {
  const link = API_KEY + "/command/create";
  console.log("sending command " + type + ": " + content);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: type,
      content: content,
      hubId: hubId
    })
  };
  try {
    const response = await fetch(link, requestOptions);
  } catch (err) {
    console.log("Fail to send command");
  }
}

const pingDevice = async (id) => {
  const link = API_KEY + "/command/device/ping/" + id;
  console.log("pinging device with id: " + id);
  try {
    let res = await axios({
      method: 'get',
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
    }
    else {
      return { status: 500 };
    }
  }
}

const pingHub = async (id) => {
  const link = API_KEY + "/command/hub/ping/" + id;
  console.log("pinging hub with id: " + id);
  try {
    let res = await axios({
      method: 'get',
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
    }
    else {
      return { status: 500 };
    }
  }
}

export {
  sendCommand,
  pingDevice,
  pingHub,
};

