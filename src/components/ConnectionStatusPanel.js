import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { pingHub, pingDevice } from '../apis/command-api';
import Loader from 'react-loader-spinner'


const ButtonTextStyle = styled.div`
  font-size: 14px;
  font-style: italic;
  color: grey;
`
const StatusStyle = styled.div`
  font-size: 14px;
  font-style: italic;
  color: grey;
  display: flex;
  justify-self: center;
  align-items:center;
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
  const [connectionStatus, setConnectionStatus] = useState('Loading');
  const unmounted = useRef(false);

  function setConnection(isConnected) {
    if (isConnected) {
      console.log("Connected!");
      setConnectionStatus('Connected');
    } else {
      console.log("Disonnected!");
      setConnectionStatus('Disconnected');
    }
  }

  function ping() {
    setConnectionStatus('Loading');
    try {
      if (props.type === 'hub') {
        pingHub(props.hub).then(res => {
          if(res.status && res.status !== 200) setConnection(false);
          else setConnection(true);
        });
      }
      else {
        pingDevice(props.hub, props.device).then(res => {
          if(res.status && res.status !== 200) setConnection(false);
          else setConnection(true);
        });
      }
    } catch (err) {
      setConnection(false);
    }
  }

  useEffect(() => {
    setConnectionStatus('Loading');
    ping();
    return () => { unmounted.current = true }
  }, [props.hub])

  let StatusIcon = <SpinnerStyle>
    <Loader
      type="TailSpin"
      color="#24292E"
      height={15}
      width={15} />
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