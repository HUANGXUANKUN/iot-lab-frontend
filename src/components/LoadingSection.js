import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';


const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 0;
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