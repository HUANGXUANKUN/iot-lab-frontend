import React from 'react';
import styled from 'styled-components';
import { greyBackgroundColor } from './../assets/styles/theme-styles';

const BackgroundPage = styled.div`
  ${greyBackgroundColor};
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding: 5px;
`

export default BackgroundPage;