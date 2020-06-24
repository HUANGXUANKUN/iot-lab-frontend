import highchartsConfig from './HighchartsConfig';
import React, { useState, useEffect } from 'react';
import ReactHighcharts from 'react-highcharts';
import HighchartsTheme from './HighchartsTheme';
import Section from './../../components/Section';
import styled from 'styled-components';

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

const ChartStyle = styled.div`
  padding: 10px;
  margin: 5px;
`

const getCurrentDataSet = (historical) => {
  const MAX_UNIT = 10;

  let currentHistorical = historical.slice(Math.max(historical.length - MAX_UNIT, 0));

  let currentDataSet;
  currentDataSet = [
    {
      data: currentHistorical.map((set, index) => {
        const localDateTime = new Date(Number(set.lastModified)).toString();
        console.log(localDateTime);
        return ([
          localDateTime, set.value
        ]);
      })
    }
  ]

  console.log("current data set is ", currentDataSet);
  return currentDataSet;
}

const DataChart = (props) => {
  const [currentDataSet, setCurrentDataSet] = useState(null);

  useEffect(() => {
    console.log("currentDataSet is: ", props.device.historical);
    const slicedCurrentDataSet = getCurrentDataSet(props.device.historical);
    setCurrentDataSet(slicedCurrentDataSet);
  }, [props.device])


  if (currentDataSet) {
    return (
      <Section>
          <div>
            Last update: {props.lastFetchSeconds} seconds ago.
          </div>
        <ChartStyle>
          <ReactHighcharts config={highchartsConfig(currentDataSet)} />
        </ChartStyle>
      </Section>
    )
  } else {
    return (
      <div> Loading Data </div>
    )
  }
}
export default DataChart;