import React from 'react';
import styled from 'styled-components';
import {whiteBackgroundColor} from "../assets/styles/theme-styles"

const SectionStyle = styled.div`
  ${whiteBackgroundColor}
  padding: 10px;
  margin: 10px;
`
export default function Section(props) {
  return (
    <SectionStyle>{props.children}</SectionStyle>
  );
}
