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

const { SearchBar } = Search;
const headerSortingStyle = { backgroundColor: '#F1F8FF' };

function dateTimeFormatter(cell, row) {
  return (
    <div> {getLocalDateTimeString(cell)}</div>
  );
}

function HeaderFormatter(column, colIndex, { sortElement, filterElement }) {
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

const columns = [
  {
    dataField: 'name',
    text: 'Hub Name',
    sort: true,
    filter: textFilter(),
    headerSortingStyle,
    headerFormatter: HeaderFormatter,
    sortCaret: (order, column) => {
      if (!order) return (<span><ArrowDropUpIcon /><ArrowDropDownIcon /></span>);
      else if (order === 'asc') return (<ArrowDropUpIcon />);
      else if (order === 'desc') return (<ArrowDropDownIcon />);
      return null;
    }
  },
  {
    dataField: 'description',
    text: 'Description',
    sort: true,
    filter: textFilter(),
    headerSortingStyle,
    headerFormatter: HeaderFormatter,
  },
  {
    dataField: '_id',
    text: 'ID',
    sort: true,
    filter: textFilter(),
    headerSortingStyle,
    headerFormatter: HeaderFormatter,
  },
  {
    dataField: 'lastModified',
    text: 'Last Modified',
    formatter: dateTimeFormatter,
    sort: true,
    filter: textFilter(),
    headerSortingStyle,
    headerFormatter: HeaderFormatter,
  },
  {
    dataField: 'ipAddress',
    text: 'IP',
    filter: textFilter(),
    sort: true,
    headerFormatter: HeaderFormatter,
  },
  {
    dataField: 'port',
    text: 'port',
    headerFormatter: HeaderFormatter,
  },
];

const afterSearch = (newResult) => {
  console.log(newResult);
};

const defaultSorted = [{
  dataField: 'id',
  order: 'desc'
}];


const TableView = (props) => {
  const [data, setData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [loadingHasFailed, setLoadingHasFailed] = useState(false);

  useEffect(() => {
    try {
      fetchAllHubs().then(res => {
        // process data
        setLoadingMessage("Loading hubs data...");
        setData(res);
      });
    } catch{
      setLoadingHasFailed(true);
      console.log("fail fetching data");
    }
  }, []);

  if (data === null) return <LoadingPage message={loadingMessage} hasFailed={loadingHasFailed} />;

  else return (
    <div>
      <Section>
        <BootstrapTable
          keyField="id"
          data={data}
          columns={columns}
          defaultSorted={defaultSorted}
          defaultSortDirection="asc"
          filter={filterFactory()}
          pagination={paginationFactory()}
          overlay={overlayFactory({ spinner: true, styles: { overlay: (base) => ({ ...base, background: 'rgba(255, 0, 0, 0.5)' }) } })}

        />
      </Section>
    </div>
  )
}

export default TableView;

