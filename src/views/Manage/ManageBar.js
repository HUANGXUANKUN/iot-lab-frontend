import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewButton from './NewButton';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { createHub, fetchAllHubs } from "../../apis/hub-api";
import Modal from "react-modal";
import HubPanel from "./HubPanel";

const BarStyle = styled.div`
    display: flex;
    margin: 5px;
    margin-right: 30px;
    margin-left:auto;
    width: 100px;
    align-items: center;
    height:40px;
`

const ButtonStyle = styled.div`
    margin: 0px 5px; 
    width: 100px;   
`

const FormGridStyle = styled.div`
  display: grid;
  padding: 10px;
  font-size: 12pt;
  justify-items: center;
  grid-column-gap:10px;
  grid-row-gap:10px;
  grid-template-columns: 1fr; 
`

const FormContainerStyle = styled.div`
  max-width: 400px;
  margin: 0 auto;
`

const modalCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: '40px',
        transform: 'translate(-50%, -50%)'
    }
};

const NewHubForm = (props) => {
    const { register, handleSubmit, watch, errors, reset } = useForm();
    const onSubmit = (data, e) => {
        console.log(data);
        try {
            console.log("Creating Hub...");
            createHub(data).then(res => {
                console.log(res);
                e.target.reset();
                console.log("Closing...");
                props.onClose();
                console.log("getting new hubs data...");
                props.onSubmitNewHub();
                console.log("Done...");
            });
        } catch{
            console.log("Fail creating hub");
            window.alert("Fail creating hub");
        }
    }; //form submit function which will invoke after successful validation

    // console.log("name: ", watch("name")); //watch individual input by pass the name of the input

    return (
        <FormContainerStyle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormGridStyle>
                    <label>Name</label>
                    <input name="name" defaultValue="" ref={register} />

                    <label>Description</label>
                    <input
                        name="description"
                        defaultValue=""
                        ref={register({ required: true, maxLength: 200 })}
                    />

                    <label>IP address</label>
                    <input
                        name="ipAddress"
                        defaultValue="192.27.221.30"
                        ref={register({ required: true, maxLength: 20 })}
                    />

                    <label>Port</label>
                    <input
                        name="port"
                        defaultValue="3000"
                        ref={register({ required: true, maxLength: 4 })}
                    />
                    <input type="submit" />
                </FormGridStyle>
            </form>
        </FormContainerStyle>
    );
}

export default function (props) {
    const [newHubModalVisible, setNewHubModalVisible] = useState(false);
    const [hubs, setHubs] = useState(null);

    function showNewHubModalHandler() {
        setNewHubModalVisible(true);
    }

    function closeNewHubModalHandler() {
        setNewHubModalVisible(false);
    }

    function fetchHubsHandler() {
        try {
            fetchAllHubs().then(res => { 
                setHubs(res);
                console.log("Hubs data: ", res);
             });
        } catch{
            console.log("fail fetching data");
            window.alert("fail fetching data")
        }
    }

    useEffect(() => {
        try {
            fetchAllHubs().then(res => { 
                setHubs(res);
                console.log("Hubs data: ", res);
             });
        } catch{
            console.log("fail fetching data");
        }
    }, []);

    return (
        <>
            <BarStyle>
                <ButtonStyle>
                    <NewButton onClick={showNewHubModalHandler}>New Hub</NewButton>
                </ButtonStyle>
                <Modal
                    isOpen={newHubModalVisible}
                    onRequestClose={closeNewHubModalHandler}
                    style={modalCustomStyles}
                    contentLabel="New Hub Modal"
                >
                    <NewHubForm onClose={closeNewHubModalHandler} onSubmitNewHub={fetchHubsHandler} />
                </Modal>
            </BarStyle>
            <HubPanel hubs={hubs} />
        </>
    )
}