import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from 'react-spinner-material';
import Button from '@material-ui/core/Button';
import { Default } from 'react-awesome-spinners';

const StatusStyle = styled.div`
  font-size: 8px;
  display: flex;
  justify-content: center;
`

const Dot = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  margin-right: 5px;
`

const RedDot = styled(Dot)`
  background-color: red;
`
const GreenDot = styled(Dot)`
  background-color: #00fc11;
`

function ConnectionStatus(props) {
  const [connectionStatus, setConnectionStatus] = useState("DISCONNECTED")
  useEffect(() => {
    try {
      setConnectionStatus(props.status);
    } catch{

    }
  }, [])

  let StatusIcon = <GreenDot/>;
  if (connectionStatus === "DISCONNECTED") {
    StatusIcon = <RedDot />
  }

  return (
    <div>
      <StatusStyle>
        {StatusIcon}
        {connectionStatus}
      </StatusStyle>
    </div>
  )
}

export default ConnectionStatus;