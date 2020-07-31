import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

import { getHub } from "../../apis/hub-api";
import LoadingPage from "../../components/LoadingPage";
import { getLocalDateTimeString } from "../../util/dateTimeParser";
import ConnectionStatusPanel from "../../components/ConnectionStatusPanel";
import EditHubModal from "../../components/Modals/EditHubModal";
import DeleteHubModal from "../../components/Modals/DeleteHubModal";
import DevicePage from "./DevicePage";
import InfoSection from "./InfoSection";
import CommandBoard from "./CommandBoard";


const ContainerStyle = styled.div`
  display: flex;
  height: ${(props) => window.innerHeight - 80}px;
  margin: 10px;
`;

const PaperLeftStyle = styled.div`
  background-color: white;
  width: 400px;
  margin: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
`;

const PaperRightStyle = styled.div`
  display: flex;
  width: ${(props) => window.innerWidth - 440}px;
  margin: 5px;
`;

const Container = styled.div`
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
  align-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr 1fr;
`;

const ButtonGroup = styled.div`
  min-width: 200px;
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
`;

export default function () {
  const [hub, setHub] = useState(null);
  const [devices, setDevices] = useState([]);
  const hubId = useParams().hubId;
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const history = useHistory();

  const showEditModalHandler = () => setEditModalVisible(true);
  const closeEditModalHandler = () => setEditModalVisible(false);
  const showDeleteModalHandler = () => setDeleteModalVisible(true);
  const closeDeleteModalHandler = () => setDeleteModalVisible(false);

  const afterDeleteHubHandler = () => {
    alert("hub is deleted");
    history.push("/table");

    //redirect to table
  };

  const setHubHandler = (hub) => {
    console.log("setting new hub: ", hub);
    setHub(hub);
  };

  const fetchHubHandler = (e) => {
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
        setDevices(res.devices)
      });
    } catch {
      console.log("Fail fetching hub with id: ", hubId);
    }
  }, []);

  if (!hub) {
    return <LoadingPage message="Loading hub data..." />;
  } else {
    return (
      <ContainerStyle>
        <PaperLeftStyle>
          <Container>
            <InfoSection hub={hub} />
            <ButtonGroup>
              <IconButton onClick={showEditModalHandler} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton
                color="secondary"
                
                onClick={showDeleteModalHandler}
                aria-label="delete"
              >
                <DeleteIcon/>
              </IconButton>
            </ButtonGroup>
            <CommandBoard hub={hub} devices={devices}/>
          </Container>
        </PaperLeftStyle>
        <PaperRightStyle>
          <DevicePage hub={hub} />
        </PaperRightStyle>
        <EditHubModal
          hub={hub}
          isOpen={editModalVisible}
          onClose={closeEditModalHandler}
          onSubmitForm={setHubHandler}
        />
        <DeleteHubModal
          hub={hub}
          isOpen={deleteModalVisible}
          onClose={closeDeleteModalHandler}
          onSubmitForm={afterDeleteHubHandler}
        />
      </ContainerStyle>
    );
  }
}
