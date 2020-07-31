import React from 'react';
import styled from 'styled-components';

const SectionStyle = styled.div`
  background-color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #e3dada;
`
export default function Section(props) {
  return (
    <SectionStyle>{props.children}</SectionStyle>
  );
}
