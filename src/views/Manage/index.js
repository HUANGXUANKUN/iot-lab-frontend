import React, { useState, useEffect } from 'react';
import HubPanel from "./HubPanel";
import ManageBar from "./ManageBar";
import styled from 'styled-components';

export default function () {
  return (
    <>
      <ManageBar/>
      <HubPanel />
    </>
  )
}

