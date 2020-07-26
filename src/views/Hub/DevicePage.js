import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import SortIcon from "@material-ui/icons/Sort";
import Tooltip from "@material-ui/core/Tooltip";
import cloneDeep from "lodash/cloneDeep";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoadingPage from "../../components/LoadingPage";
import { getLocalDateTimeString } from "../../assets/util/dateTimeParser";
import NewButton from "../../components/NewButton";
import truncate from "../../assets/util/truncate";
import EditDeviceModal from "../../components/Modals/EditDeviceModal";
import DeleteDeviceModal from "../../components/Modals/DeleteDeviceModal";
import AddDeviceModal from "../../components/Modals/AddDeviceModal";


const NewButtonStyle = styled.div`
  margin: 10px 10px;
  width: 100px;
`;

const ContainerStyle = styled.div`
  /* border: 2px solid yellow; */
  display: flex;
  flex-direction: column;
  /* height: ${(props) => window.innerHeight - 100}px; */
`;

const PaperUpperStyle = styled.div`
  /* border: 2px solid purple; */
  background-color: white;
  height: 00px;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
`;

const PaperBottomStyle = styled.div`
  /* border: 2px solid green; */
  background-color: white;
  flex-grow: 1;
  margin-top: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
  overflow: auto;
`;

const descriptionFormatter = (cell, row) => {
  return (
    <Tooltip title={cell} aria-label={"tooltip-device-description" + row._id}>
      <Typography>{truncate(cell, 30, true)}</Typography>
    </Tooltip>
  );
};

const nameFormatter = (cell, row) => {
  return (
    <Tooltip title={cell} aria-label={"tooltip-device-name" + row._id}>
      <Typography style={{ fontSize: "13px" }}>
        {truncate(cell, 30, true)}
      </Typography>
    </Tooltip>
  );
};

function columnFormatter(cell, row) {
  return <Typography style={{ fontSize: "13px" }}> {cell}</Typography>;
}

const dateTimeFormatter = (cell, row) => {
  return (
    <Typography style={{ fontSize: "13px" }}>
      {getLocalDateTimeString(cell)}
    </Typography>
  );
};

const rowStyleFormat = (row, rowIdx) => {
  return { backgroundColor: "red" };
};

const headerFormatter = (column, colIndex, { sortElement, filterElement }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        color: "#140d0d",
        fontWeight: "bold",
      }}
    >
      <div>{filterElement}</div>
      <div style={{ display: "flex", fontSize: "12px" }}>
        {column.text.toUpperCase()}
        {sortElement}
      </div>
    </div>
  );
};

const sortCaret = (order, column) => {
  if (!order) return <div />;
  else if (order === "asc") return <ArrowDropUpIcon />;
  else if (order === "desc") return <ArrowDropDownIcon />;
  return null;
};

const defaultSorted = [
  {
    dataField: "id",
    order: "desc",
  },
];

const DevicePage = (props) => {
  const [hub, setHub] = useState(null);
  const [devices, setDevices] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [hiddenRowKeys, setHiddenRowKeys] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [loadingHasFailed, setLoadingHasFailed] = useState(false);
  const [editDeviceModalVisible, setEditDeviceModalVisible] = useState(false);
  const [deleteDeviceModalVisible, setDeleteDeviceModalVisible] = useState(
    false
  );
  const [addDeviceModalVisible, setAddDeviceModalVisible] = useState(false);

  const showEditDeviceModalHandler = () => setEditDeviceModalVisible(true);
  const closeEditDeviceModalHandler = () => setEditDeviceModalVisible(false);

  const showDeleteDeviceModalHandler = () => setDeleteDeviceModalVisible(true);
  const closeDeleteDeviceModalHandler = () =>
    setDeleteDeviceModalVisible(false);

  const showAddDeviceModalHandler = () => setAddDeviceModalVisible(true);
  const closeAddDeviceModalHandler = () => setAddDeviceModalVisible(false);

  const editRowHandler = (newRow) => {
    // e.preventDefault();
    const rowId = newRow._id;
    const newDevices = devices.map((device) => {
      if (device._id === rowId) {
        return newRow;
      } else return device;
    });
    setDevices(newDevices);
  };
  const deleteRowHandler = (row) => {
    // e.preventDefault();
    // const rowId = row._id;
    hiddenRowKeys.push(row._id);
    const newHiddenRowKeys = cloneDeep(hiddenRowKeys);
    console.log("newHiddenrowsKeys: ", hiddenRowKeys);
    setHiddenRowKeys(newHiddenRowKeys);
  };
  const addRowHandler = (row) => {
    // e.preventDefault();
    console.log("row:", row);
    devices.unshift(row);
    setDevices(cloneDeep(devices));
  };

  const buttonsFormatter = (cell, row) => {
    return (
      <>
        <IconButton
          onClick={showEditDeviceModalHandler}
          aria-label={"edit-button-" + row._id}
        >
          <EditIcon
            onClick={() => {
              showEditDeviceModalHandler();
              setSelectedDevice(row);
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => {
            showDeleteDeviceModalHandler();
            setSelectedDevice(row);
          }}
          color="secondary"
          aria-label={"delete-button-" + row._id}
        >
          <DeleteIcon />
        </IconButton>
      </>
    );
  };

  const buttonHeaderFormatter = (
    column,
    colIndex,
    { sortElement, filterElement }
  ) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          color: "#140d0d",
          fontWeight: "bold",
        }}
      >
          <NewButtonStyle>
            <NewButton
              onClick={() => {
                showAddDeviceModalHandler();
              }}
            >
              New
            </NewButton>
          </NewButtonStyle>
      </div>
    );
  };

  const columns = [
    {
      dataField: "name",
      text: "Device Name",
      sort: true,
      filter: textFilter(),
      formatter: nameFormatter,
      headerFormatter,
      sortCaret,
      headerAttrs: {
        // hidden: true
      },
    },
    {
      dataField: "description",
      text: "Description",
      formatter: descriptionFormatter,
      sort: true,
      filter: textFilter(),
      headerFormatter,
      sortCaret,
      headerAttrs: {
        // hidden: true
      },
    },
    {
      dataField: "_id",
      text: "ID",
      sort: true,
      formatter: columnFormatter,
      headerFormatter,
      filter: textFilter(),
      sortCaret,
      headerStyle: {
        width: "200px",
      },
      headerAttrs: {
        // hidden: true
      },
    },
    {
      dataField: "lastModified",
      text: "Modified",
      filter: textFilter(),
      formatter: dateTimeFormatter,
      sort: true,
      headerFormatter,
      sortCaret,
      headerAttrs: {
        // hidden: true
      },
    },
    {
      dataField: "ipAddress",
      text: "IP",
      sort: true,
      formatter: columnFormatter,
      filter: textFilter(),
      sortCaret: sortCaret,
      headerFormatter,
      headerAttrs: {
        // hidden: true
      },
    },
    {
      dataField: "port",
      text: "port",
      sort: true,
      formatter: columnFormatter,
      sortCaret: sortCaret,
      filter: textFilter(),
      headerFormatter,
      headerStyle: {
        width: "120px",
      },
      headerAttrs: {
        // hidden: true
      },
    },
    {
      dataField: "button-group",
      text: "",
      formatter: buttonsFormatter,
      headerFormatter: buttonHeaderFormatter,
      headerStyle: {
        width: "120px",
      },  
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {},
      },
    },
  ];

  useEffect(() => {
    setDevices(props.hub.devices);
    setHub(props.hub);
  }, []);

  if (!hub || !devices)
    return (
      <LoadingPage message={loadingMessage} hasFailed={loadingHasFailed} />
    );
  else
    return (
      <ContainerStyle>
        <PaperUpperStyle />
        <PaperBottomStyle>
          {/* <NewButtonStyle>
            <NewButton
              onClick={() => {
                showAddDeviceModalHandler();
              }}
            >
              New Hub
            </NewButton>
          </NewButtonStyle> */}
          <BootstrapTable
            keyField="_id"
            data={devices}
            columns={columns}
            defaultSorted={defaultSorted}
            defaultSortDirection="asc"
            condensed
            hover
            hiddenRows={hiddenRowKeys}
            bordered={false}
            noDataIndication="No devices"
            tableHeaderClass={"col-hidden"}
            filter={filterFactory()}
          />
          <EditDeviceModal
            device={selectedDevice}
            isOpen={editDeviceModalVisible}
            onClose={closeEditDeviceModalHandler}
            onSubmitForm={editRowHandler}
          />
          <DeleteDeviceModal
            device={selectedDevice}
            isOpen={deleteDeviceModalVisible}
            onClose={closeDeleteDeviceModalHandler}
            onSubmitForm={deleteRowHandler}
          />
          <AddDeviceModal
            hub={hub}
            isOpen={addDeviceModalVisible}
            onClose={closeAddDeviceModalHandler}
            onSubmitForm={addRowHandler}
          />
        </PaperBottomStyle>
      </ContainerStyle>
    );
};

export default DevicePage;
