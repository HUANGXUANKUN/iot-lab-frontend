import React, { useState, useEffect } from 'react';
import HubPanel from "./HubPanel";
import ManageBar from "./ManageBar";
import styled from 'styled-components';

const Container = styled.div`
 ${'' /* overflow: auto;
 height: 90vh; */}
`

export default function () {
  return (
    <Container>
      <ManageBar />
      <HubPanel />
    </Container>
  )
}

