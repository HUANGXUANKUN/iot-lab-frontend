import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import LoadingPage from '../../components/LoadingPage';
import { fetchAllHubs } from "../../apis/hub-api";
import { getLocalDateTimeString } from '../../assets/util/dateTimeParser';
import Section from './../../components/Section';
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "bootstrap/dist/css/bootstrap.min.css";

const { SearchBar } = Search;
const headerSortingStyle = { backgroundColor: '#F1F8FF' };

const dateTimeFormatter=(cell, row) =>{
  return (
    <div> {getLocalDateTimeString(cell)}</div>
  );
}

const headerFormatter = (column, colIndex, { sortElement, filterElement }) =>{
  console.log("sortElement,", sortElement);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', color: '#140d0d', fontWeight: 'bold' }}>
      <div>{filterElement}</div>
      <div style={{ display: 'flex'}}>
        {column.text.toUpperCase()}
        {sortElement}
      </div>
    </div>
  );
}

const sortCaret = (order, column) => {
  if (!order) return (<span><ArrowDropUpIcon /><ArrowDropDownIcon /></span>);
  else if (order === 'asc') return (<ArrowDropUpIcon />);
  else if (order === 'desc') return (<ArrowDropDownIcon />);
  return null;
}

const columns = [
  {
    dataField: 'name',
    text: 'Hub Name',
    sort: true,
    filter: textFilter(),
    headerSortingStyle,
    headerFormatter,
    sortCaret
  },
  {
    dataField: 'description',
    text: 'Description',
    sort: true,
    filter: textFilter(),
    headerSortingStyle,
    headerFormatter,
    sortCaret,
  },
  {
    dataField: '_id',
    text: 'ID',
    sort: true,
    filter: textFilter(),
    headerSortingStyle,
    headerFormatter,
    sortCaret,
  },
  {
    dataField: 'lastModified',
    text: 'Modified',
    formatter: dateTimeFormatter,
    sort: true,
    filter: textFilter(),
    headerSortingStyle,
    headerFormatter,
    sortCaret,
  },
  {
    dataField: 'ipAddress',
    text: 'IP',
    filter: textFilter(),
    sort: true,
    sortCaret: sortCaret,
    headerSortingStyle,
    headerFormatter,
  },
  {
    dataField: 'port',
    text: 'port',
    filter: textFilter(),
    sort: true,
    sortCaret: sortCaret,
    headerSortingStyle,
    headerFormatter,
  },
];

const afterSearch = (newResult) => {
  console.log(newResult);
};

const defaultSorted = [{
  dataField: 'id',
  order: 'desc'
}];

const expandRow = {
  // onlyOneExpanding: true,
  showExpandColumn: true,
  renderer: row => (
    <div>
      {console.log("row:", row)}
      <p>{ `This Expand row is belong to rowKey ${row._id}` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  ),
  expandHeaderColumnRenderer: ({ isAnyExpands }) => {
    if (isAnyExpands) {
      return <KeyboardArrowUpIcon/>;
    }
    return <KeyboardArrowDownIcon/>;
  },
  expandColumnRenderer: ({ expanded }) => {
    if (expanded) {
      return (
        <KeyboardArrowUpIcon/>
        // <b>-</b>
      );
    }
    return (
      <KeyboardArrowDownIcon/>
      // <b>...</b>
    );
  }
};


const TableView = (props) => {
  const [data, setData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [loadingHasFailed, setLoadingHasFailed] = useState(false);

  useEffect(() => {
    try {
      fetchAllHubs().then(res => {
        setLoadingMessage("Loading hubs data...");
        setData(res);
      });
    } catch{
      setLoadingHasFailed(true);
      alert("fail fetching data");
    }
  }, []);

  if (data === null) return <LoadingPage message={loadingMessage} hasFailed={loadingHasFailed} />;

  else return (
    <div>
      <Section>
        <BootstrapTable
          keyField="_id"
          data={data}
          columns={columns}
          defaultSorted={defaultSorted}
          defaultSortDirection="asc"
          filter={filterFactory()}
          hover
          bordered={false}
          pagination={paginationFactory()}
          expandRow={ expandRow }
        />
      </Section>
    </div>
  )
}

export default TableView;

