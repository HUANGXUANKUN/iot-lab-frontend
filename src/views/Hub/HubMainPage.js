import React, { useState, useEffect, useRef } from "react";
import { useParams,useHistory } from "react-router-dom";
import styled from "styled-components";
import Modal from 'react-modal';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';


import { getHub } from "../../apis/hub-api";
import LoadingPage from "../../components/LoadingPage";
import { getLocalDateTimeString } from "../../assets/util/dateTimeParser";
import ConnectionStatusPanel from "../../components/ConnectionStatusPanel";
import EditHubModal from "../../components/Modals/EditHubModal";
import DeleteHubModal from "../../components/Modals/DeleteHubModal";
import ExpandedRow from "./DeviceTable";


const ContainerStyle = styled.div`
  border: 2px solid red;
  display: flex;
  height: ${(props) => window.innerHeight - 100}px;
  margin: 10px;
`;

const PaperLeftStyle = styled.div`
  border: 2px solid green;
  background-color: white;
  width: 400px;
  margin: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
`;

const PaperRightStyle = styled.div`
  border: 2px solid blue;
  background-color: white;
  flex-grow: 1;
  margin: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
`;

const Container = styled.div`
  border: 2px solid yellow;
  width: 100%;
  padding: 10px;
`;

const HubHeader = styled.div`
  font-size: 16px;
  text-align: left;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 80px;
`;

const SectionStyle = styled.div`
  display: grid;
  text-align: left;
  font-size: 12pt;
  justify-items: left;
  align-items:center;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr 1fr;
`;

const ButtonGroup = styled.div`
  min-width: 200px;
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
`

export default function () {
  const [hub, setHub] = useState(null);
  const hubId = useParams().hubId;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const history = useHistory();

  const showEditModalHandler = () => setEditModalVisible(true);
  const closeEditModalHandler = () => setEditModalVisible(false);
  const showDeleteModalHandler = () => setDeleteModalVisible(true);
  const closeDeleteModalHandler = () => setDeleteModalVisible(false);
  const showAddModalHandler = () => setAddModalVisible(true);
  const closeAddModalHandler = () => setAddModalVisible(false);

  const afterDeleteHubHandler = () => {

    alert("hub is deleted");
    history.push("/table");

    //redirect to table 
  }

  const setHubHandler = (hub) => {
    console.log("setting new hub: ", hub);
    setHub(hub);
  }

  const fetchHubHandler = () => {
    try {
      getHub(hubId).then((res) => {
        console.log(res);
        setHub(res);
      });
    } catch {
      console.log("Fail fetching hub with id: ", hubId);
    }
  };

  useEffect(() => {
    try {
      getHub(hubId).then((res) => {
        console.log(res);
        setHub(res);
      });
    } catch {
      console.log("Fail fetching hub with id: ", hubId);
    }
  }, [hubId]);

  if (!hub) {
    return <LoadingPage message="Loading hub data..." />;
  } else {
    return (
      <ContainerStyle>
        <PaperLeftStyle>
          <Container>
            <HubHeader>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "250px",
                }}
              >
                <h3>{hub.name}</h3>
              </div>
              <ConnectionStatusPanel type="hub" hub={hub} />
            </HubHeader>
            <SectionStyle>
              <div>Description: </div>
              <div>{hub.description}</div>
              <div>IP Address: </div>
              <div>{hub.ipAddress}</div>
              <div>Port: </div>
              <div>{hub.port}</div>
              <div>Last Modified: </div>
              <div>{getLocalDateTimeString(hub.lastModified)}</div>
            </SectionStyle>
            <ButtonGroup>
            <IconButton onClick={showEditModalHandler} aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton onClick={showAddModalHandler} aria-label="add">
              <AddIcon />
            </IconButton>
            <IconButton color="secondary"onClick={showDeleteModalHandler} aria-label="delete">
              <DeleteIcon/>
            </IconButton>
          </ButtonGroup>
          </Container>
        </PaperLeftStyle>
        <PaperRightStyle>
          <ExpandedRow hub ={hub} setHubHandler={setHubHandler}/>
          {/* <HubCard hub={hub} fetchHubHandler={fetchHubHandler}/> */}
        </PaperRightStyle>
        <EditHubModal hub={hub} isOpen={editModalVisible} onClose={closeEditModalHandler} onSubmitForm={setHubHandler}/>
        <DeleteHubModal hub={hub} isOpen={deleteModalVisible} onClose={closeDeleteModalHandler} onSubmitForm={afterDeleteHubHandler}/>
      </ContainerStyle>
    );
  }
}
