import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const Container = styled.div`
  position: relative;
`

const LoaderContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CenterBlock = styled.div`
  width: 500px;
  height: 10em;
  display: grid;
  align-items: center;
  justify-content: center;
`

export default function () {
  return (
    <div>
      <LoaderContainer>
        <Loader type="ThreeDots" color="#4f4f4f" height={80} width={80} />
      </LoaderContainer>
    </div>
  )
}