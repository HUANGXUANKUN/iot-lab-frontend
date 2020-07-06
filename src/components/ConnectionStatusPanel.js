import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { pingHub, pingDevice } from '../assets/apis/command-api';
import Loader from 'react-loader-spinner'

const ContainerGrid = styled.div`
  display: flex;
  justify-content: center;
`
const ButtonTextStyle = styled.div`
  font-size: 8px;
  font-style: italic;
  color: grey;
`
const StatusStyle = styled.div`
  font-size: 8px;
  font-style: italic;
  color: grey;
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
const SpinnerStyle = styled(Dot)`
  margin-right: 10px;
`

const ConnectionStatus = props => {
  const [connectionStatus, setConnectionStatus] = useState('Loading')

  function setConnection(isConnected) {
    if (isConnected) {
      setConnectionStatus('Connected');
    } else {
      setConnectionStatus('Disconnected');
    }
  }

  function ping() {
    setConnectionStatus('Loading');
    let responseStatus = false;
    try {
      if (props.type === 'hub') {
        pingHub(props.id).then(isConnected => setConnection(isConnected));
      } else if (props.type === 'device') {
        pingDevice(props.id).then(isConnected => setConnection(isConnected));
      }

    } catch{
      console.log("fail to ping " + props.type + " with id = " + props.id);
      setConnectionStatus('Disconnected');
    }
  }

  useEffect(() => {
    setConnectionStatus('Loading');
    ping();
  }, [])

  let StatusIcon = <SpinnerStyle>
    <Loader
      type="TailSpin"
      color="#24292E"
      height={15}
      width={15} />;
  </SpinnerStyle>

  if (connectionStatus === "Connected") {
    StatusIcon = <GreenDot />
  }
  else if (connectionStatus === "Disconnected") {
    StatusIcon = <RedDot />
  }

  return (
    <div >
      <StatusStyle>
        <Button size="small" onClick={ping}>
          {StatusIcon}
          <ButtonTextStyle>
            {connectionStatus}
          </ButtonTextStyle>
        </Button>
      </StatusStyle>
    </div>
  )
}

function ConnectionStatusPanel(props) {
  return (
    <ConnectionStatus {...props} />
  )
}

export default ConnectionStatusPanel;