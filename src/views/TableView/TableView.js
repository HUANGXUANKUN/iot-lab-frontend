import React, { useState, useEffect, forceUpdate } from "react";
import { useHistory } from "react-router-dom";
import BootstrapTable, {
  ROW_SELECT_DISABLED,
} from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import paginationFactory from "react-bootstrap-table2-paginator";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { DeleteIcon, IconButton, EditIcon, AddIcon } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import cloneDeep from "lodash/cloneDeep";
import Modal from "react-modal";

import NewButton from "../../components/NewButton";
import LoadingPage from "../../components/LoadingPage";
import { createHub, fetchAllHubs } from "../../apis/hub-api";
import { getLocalDateTimeString } from "../../util/dateTimeParser";
import Section from "./../../components/Section";
import truncate from "../../util/truncate";
import { useForm } from "react-hook-form";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ExpandedRow from "./ExpandedRow";
import "./TableView.css";
import ErrorFormMessage from "../../components/Modals/ErrorFormMessage";

const ButtonStyle = styled.div`
  margin: 10px 10px;
  width: 100px;
  float: right;
`;

const FormGridStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  width: 300px;
  text-align: center;
  padding: 10px;
  font-size: 16pt;
  justify-items: center;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: 1fr;
`;

const modalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "40px",
    transform: "translate(-50%, -50%)",
  },
};

const NewHubForm = (props) => {
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    createHub(data)
      .then((res) => {
        e.target.reset();
        props.onClose();
        props.onSubmitNewHub(res);
      })
      .catch((err) => {
        alert(err.message);
      });
  }; //form submit function which will invoke after successful validation

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGridStyle>
        <h3> Create Hub </h3>

        <label>Name</label>
        <input
          name="name"
          defaultValue=""
          ref={register({ required: true})}
        />

        <label>Description</label>
        <input
          name="description"
          defaultValue=""
          ref={register({ required: true})}
        />

        <label>IP address</label>
        <input
          name="ipAddress"
          defaultValue="192.27.221.30"
          ref={register({ required: true})}
        />

        <label>Port</label>
        <input
          name="port"
          defaultValue="3000"
          ref={register({ required: true})}
        />
        <input type="submit" />
        <ErrorFormMessage errors={errors} />
      </FormGridStyle>
    </form>
  );
};

const HubLinkButton = (props) => {
  let history = useHistory();

  function handleClick() {
    history.push(props.link);
  }

  return (
    <Tooltip title={props.text} aria-label={"tooltip-name-" + props.text}>
      <Button color="inherit" onClick={handleClick}>
        <Typography color="primary">
          {" "}
          {truncate(props.text, 10, true)}
        </Typography>
      </Button>
    </Tooltip>
  );
};

const dateTimeFormatter = (cell, row) => {
  return <div> {getLocalDateTimeString(cell)}</div>;
};

const descriptionFormatter = (cell, row) => {
  return (
    <Tooltip title={cell} aria-label={"tooltip-description" + row._id}>
      <div> {truncate(cell, 30, true)}</div>
    </Tooltip>
  );
};

const nameFormatter = (cell, row) => {
  return <HubLinkButton link={"hub/" + row._id} text={cell} />;
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
      <div style={{ display: "flex" }}>
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

const expandRow = {
  // onlyOneExpanding: true,
  // expandByColumnOnly: true,
  showExpandColumn: true,
  parentClassName: "parent-expand-foo",
  className: "expanding-foo",
  renderer: (row) => (
    <div className="ExtentedRow">
      {console.log("row:", row)}
      <div>
        <ExpandedRow devices={row.devices} />
      </div>
    </div>
  ),
  expandHeaderColumnRenderer: ({ isAnyExpands }) => {
    if (isAnyExpands) {
      return <KeyboardArrowUpIcon />;
    }
    return <KeyboardArrowDownIcon />;
  },
  expandColumnRenderer: ({ expanded }) => {
    if (expanded) {
      return <KeyboardArrowUpIcon />;
    }
    return <KeyboardArrowDownIcon />;
  },
};

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing {from} to {to} of {size} Results
  </span>
);

const TableView = (props) => {
  const [data, setData] = useState(null);
  const [hiddenRowKeys, setHiddenRowKeys] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [loadingHasFailed, setLoadingHasFailed] = useState(false);
  const [newHubModalVisible, setNewHubModalVisible] = useState(false);

  function showNewHubModalHandler() {
    setNewHubModalVisible(true);
  }

  useEffect(() => {
    try {
      fetchAllHubs().then((res) => {
        setLoadingMessage("Loading hubs data...");
        setData(res);
      });
    } catch {
      setLoadingHasFailed(true);
      alert("fail fetching data");
    }
  }, []);

  function showNewHubModalHandler() {
    setNewHubModalVisible(true);
  }

  function closeNewHubModalHandler() {
    setNewHubModalVisible(false);
  }

  const addRowHandler = (formData) => {
    data.unshift(formData);
    const newData = cloneDeep(data);
    setData(newData);
  };

  const columns = [
    {
      dataField: "name",
      text: "Hub Name",
      sort: true,
      formatter: nameFormatter,
      filter: textFilter(),
      headerFormatter,
      sortCaret,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      formatter: descriptionFormatter,
      filter: textFilter(),
      headerFormatter,
      sortCaret,
    },
    {
      dataField: "_id",
      text: "ID",
      sort: true,
      filter: textFilter(),
      headerFormatter,
      sortCaret,
      headerStyle: {
        width: "250px",
      },
    },
    {
      dataField: "lastModified",
      text: "Modified",
      formatter: dateTimeFormatter,
      sort: true,
      filter: textFilter(),
      headerFormatter,
      sortCaret,
    },
    {
      dataField: "ipAddress",
      text: "IP",
      filter: textFilter(),
      sort: true,
      sortCaret: sortCaret,
      headerFormatter,
    },
    {
      dataField: "port",
      text: "port",
      filter: textFilter(),
      sort: true,
      sortCaret: sortCaret,
      headerFormatter,
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "15",
        value: 15,
      },
      {
        text: "20",
        value: 20,
      },
      {
        text: "All",
        value: data ? data.length : 100,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  if (data === null)
    return (
      <LoadingPage message={loadingMessage} hasFailed={loadingHasFailed} />
    );
  else
    return (
      <div className="MainTable">
        <Section>
          <ButtonStyle>
            <NewButton onClick={showNewHubModalHandler}>New Hub</NewButton>
          </ButtonStyle>
          <BootstrapTable
            keyField="_id"
            data={data}
            columns={columns}
            defaultSorted={defaultSorted}
            defaultSortDirection="asc"
            filter={filterFactory()}
            // condensed
            hiddenRows={hiddenRowKeys}
            // hover
            bordered={false}
            pagination={paginationFactory(options)}
            expandRow={expandRow}
            noDataIndication="Table is Empty"
            headerWrapperClasses="MainHeader"
          />
          <Modal
            isOpen={newHubModalVisible}
            onRequestClose={closeNewHubModalHandler}
            style={modalCustomStyles}
            contentLabel="New Hub Modal"
          >
            <NewHubForm
              onClose={closeNewHubModalHandler}
              onSubmitNewHub={addRowHandler}
            />
          </Modal>
        </Section>
      </div>
    );
};

export default TableView;
