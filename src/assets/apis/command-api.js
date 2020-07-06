import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';

const portAddress = 'http://localhost:5000/api';

const MAX_SELECTED = 10;
const TIME_UNITS = 10;

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
  sendCommand,
};

