import React, { useState, useEffect } from 'react';
import DeviceList from "./DeviceList";
import NewButton from "./NewButton";
import TopSectionGrid from "./TopSectionGrid";
import styled from 'styled-components';

export default function () {
  return (
    <>
      <TopSectionGrid/>
      <DeviceList />
    </>
  )
}

