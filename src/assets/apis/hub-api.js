import _ from 'lodash';
import moment from 'moment';
import React, { useRef, useState, useEffect } from 'react';

const BACKEND_API_KEY = 'http://localhost:5000/api';

const MAX_SELECTED = 10;
const TIME_UNITS = 10;

const fetchAllHubs = async () => {
  try {
    const link = BACKEND_API_KEY + "/hub/hubs";
    const response = await fetch(link);
    const responseData = await response.json();
    let newItemList = responseData.hubs;
    console.log("fetch hubs successfully!: ", newItemList);
    return newItemList;
  } catch (err) {
    console.log("fetch hubs failed!");
  }
}

export{
  fetchAllHubs
}