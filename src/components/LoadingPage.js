import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const Container = styled.div`
  height: 100vh;
  position: relative;
`

const LoaderContainer = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default function () {
  return (
    <Container>
      <LoaderContainer>
        <Loader type="ThreeDots" color="#4f4f4f" height={80} width={80} />
      </LoaderContainer>
    </Container>
  )
}