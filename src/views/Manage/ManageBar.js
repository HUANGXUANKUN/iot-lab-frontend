import React from 'react';
import styled from 'styled-components';
import NewButton from './NewButton';

const ContainerStyle = styled.div`
    display: flex;
    margin: 5px;
    margin-right: 10px;
    margin-left: auto;
    max-width: fit-content;
`

const ButtonStyle = styled.div`
    margin: 0px 5px;    
`

export default function (props) {
    return (
        <ContainerStyle>
            <ButtonStyle>
                <NewButton link="/device/new">New Hub</NewButton>
            </ButtonStyle>
            <ButtonStyle>
                <NewButton link="/device/new">New Node</NewButton>
            </ButtonStyle>
        </ContainerStyle>
    )
}