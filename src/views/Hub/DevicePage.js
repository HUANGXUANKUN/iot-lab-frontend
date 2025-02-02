import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import paginationFactory from "react-bootstrap-table2-paginator";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import cloneDeep from "lodash/cloneDeep";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoadingPage from "../../components/LoadingPage";
import { getLocalDateTimeString } from "../../util/dateTimeParser";
import NewButton from "../../components/NewButton";
import truncate from "../../util/truncate";
import EditDeviceModal from "../../components/Modals/EditDeviceModal";
import DeleteDeviceModal from "../../components/Modals/DeleteDeviceModal";
import AddDeviceModal from "../../components/Modals/AddDeviceModal";
import ChartWebSocket from "./ChartWebSocket";
import ChartHttp from "./ChartHttp";

const NewButtonStyle = styled.div`
  margin: 10px 10px;
  width: 100px;
`;

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PaperUpperStyle = styled.div`
  padding: 10px;
  background-color: white;
  height: ${(props) => Math.floor(window.innerHeight - 100) / 2}px;
  margin-bottom: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
`;

const PaperBottomStyle = styled.div`
  background-color: white;
  flex-grow: 1;
  margin-top: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.19);
  overflow: scroll;
  padding: 10px;
`;

const descriptionFormatter = (cell, row) => {
  return (
    <Tooltip title={cell} aria-label={"tooltip-device-description" + row._id}>
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
  const [devices, setDevices] = useState(null);
  const [deviceForGraph, setDeviceForGraph] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [hiddenRowKeys, setHiddenRowKeys] = useState([]);
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

  const setSelectedDeviceHandler = (row) =>{
    setSelectedDevice(row);
  }
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

  const nameFormatter = (cell, row) => {
    return (
      <Tooltip title={cell} aria-label={"tooltip-device-name" + row._id}>
        <Button onClick={() => setDeviceForGraph(row)}>
          <Typography color="primary" style={{ fontSize: "13px" }}>
            {truncate(cell, 30, true)}
          </Typography>
        </Button>
      </Tooltip>
    );
  };

  const buttonsFormatter = (cell, row) => {
    return (
      <>
        <IconButton
          aria-label={"edit-button-" + row._id}
          onClick={(e) => {
            e.preventDefault();
            setSelectedDeviceHandler(row);
            showEditDeviceModalHandler();
          }}
        >
          <EditIcon
          />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            setSelectedDeviceHandler(row);
            showDeleteDeviceModalHandler();
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
  }, []);

  if (!props.hub || !devices)
    return <LoadingPage message={"Loading devices"} />;
  else
    return (
      <ContainerStyle>
        <PaperUpperStyle>
          <div style={{ display: "flex", marginLeft: "5px" }}>
            <Typography variant="h6">Device:</Typography>
            {deviceForGraph && (
              <Badge color="secondary" variant="dot">
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", margin: "0px 5px" }}
                >
                  {deviceForGraph.name}
                </Typography>
              </Badge>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <ChartHttp hub={props.hub} device={deviceForGraph} />
            <ChartWebSocket hub={props.hub} device={deviceForGraph} />
          </div>
        </PaperUpperStyle>
        <PaperBottomStyle>
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
            hub={props.hub}
            isOpen={addDeviceModalVisible}
            onClose={closeAddDeviceModalHandler}
            onSubmitForm={addRowHandler}
          />
        </PaperBottomStyle>
      </ContainerStyle>
    );
};

export default DevicePage;
