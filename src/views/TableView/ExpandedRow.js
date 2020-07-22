import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import LoadingPage from "../../components/LoadingPage";
import { fetchAllHubs } from "../../apis/hub-api";
import { getLocalDateTimeString } from "../../assets/util/dateTimeParser";
import Section from "../../components/Section";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ExpandedRow.css";
import truncate from "../../assets/util/truncate";
import Tooltip from "@material-ui/core/Tooltip";
import cloneDeep from "lodash/cloneDeep";

const SectionStyle = styled.div`
  padding: 20px;
`;

function DeviceLinkButton(props) {
  let history = useHistory();

  function handleClick() {
    history.push(props.link);
  }
  return (
    <Tooltip title={props.text} aria-label={"tooltip-name-" + props.text}>
      <Button color="inherit" onClick={handleClick}>
        <Typography style={{ fontSize: "12px" }}> {truncate(props.text, 10, true)}</Typography>
      </Button>
    </Tooltip>
  );
}

const descriptionFormatter = (cell, row) => {
  return (
    <Tooltip title={cell} aria-label={"tooltip-device-description" + row._id}>
      <div style={{ fontSize: "12px" }}> {truncate(cell, 30, true)}</div>
    </Tooltip>
  );
};

const nameFormatter = (cell, row) => {
  return <DeviceLinkButton link={"hub/" + row._id} text={cell} />;
};

function columnFormatter(cell, row) {
  return <span style={{ fontSize: "12px" }}> {cell}</span>;
}

const dateTimeFormatter = (cell, row) => {
  return (
    <span style={{ fontSize: "12px" }}> {getLocalDateTimeString(cell)}</span>
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
  if (!order)
    return (
      <span>
        <ArrowDropUpIcon />
        <ArrowDropDownIcon />
      </span>
    );
  else if (order === "asc") return <ArrowDropUpIcon />;
  else if (order === "desc") return <ArrowDropDownIcon />;
  return null;
};

const afterSearch = (newResult) => {
  console.log(newResult);
};

const defaultSorted = [
  {
    dataField: "id",
    order: "desc",
  },
];

const ExpandedRow = (props) => {
  const [data, setData] = useState(null);
  const [hiddenRowKeys, setHiddenRowKeys] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [loadingHasFailed, setLoadingHasFailed] = useState(false);

  const deleteRowHandler = (row, rowIndex) => {
    // e
    console.log("row index is: ", rowIndex);
    // let dataRow = getRow(row);
    // dataRow.description = "new updated description...";
    // const newData = deleteTableRow(data, rowIndex);
    // hiddenRowKeys.push(row._id);
    // // const newData = cloneDeep(data);
    // console.log("newHiddenrowsKeys: ", hiddenRowKeys);
    // setData(hiddenRowKeys);
  };

  const deleteButtonFormatter = (cell, row) => {
    return (
      <IconButton aria-label="add">
        <DeleteIcon />
      </IconButton>
    );
  };

  const columns = [
    {
      dataField: "name",
      text: "Device Name",
      sort: true,
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
      sortCaret,
      headerAttrs: {
        // hidden: true
      },
    },
    {
      dataField: "lastModified",
      text: "Modified",
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
      headerFormatter,
      headerAttrs: {
        // hidden: true
      },
    },
  ];

  useEffect(() => {
    setData(props.devices);
  }, []);

  if (data === null)
    return (
      <LoadingPage message={loadingMessage} hasFailed={loadingHasFailed} />
    );
  else
    return (
      <SectionStyle>
        <BootstrapTable
          keyField="_id"
          data={data}
          columns={columns}
          defaultSorted={defaultSorted}
          defaultSortDirection="asc"
          // hover
          hiddenRows={hiddenRowKeys}
          bordered={false}
          noDataIndication="No devices"
          tableHeaderClass={"col-hidden"}
        />
      </SectionStyle>
    );
};

export default ExpandedRow;
