import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Graph } from "react-d3-graph";
import InfoSection from './InfoSection';
import LoadingPage from '../../components/LoadingPage';
import { fetchAllHubs } from "../../apis/hub-api";
import { red } from '@material-ui/core/colors';

const CANVAS_WIDTH = 1600;
const CANVAS_HEIGHT = 900;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;
const RADIUS_HUB = {horizontal: 200 , vertical: 170};
const RADIUS_DEVICE = {horizontal: 500 , vertical: 350};
const RANDOM_RANGE = 0.1;
const CENTER_ID = "IoT-Cloud-Server";

const GRAPG_CONFIG = {
  collapsible: false,
  nodeHighlightBehavior: true,
  linkHighlightBehavior: true,
  disableLinkForceConfig: false,
  height: CANVAS_HEIGHT,
  width: CANVAS_WIDTH,
  directed : true,
  node: {
    color: "lightgreen",
    size: 300,
    fontSize: 18,
    highlightStrokeColor: "blue",
    highlightFontSize: 24,
    highlightFontWeight: "bold",
  },
  link: {
    highlightColor: "red",
    fontWeight: "bold",
    strokeWidth: 5,
    highlightFontSize: 24,
    highlightFontWeight: "bold",
    markerHeight: 4,
    markerWidth: 5, 
  },
  d3: {
    "gravity": 0,
    "disableLinkForce": true,
  },
};


const nodesPositioning = (hubData, center_x, center_y, radius_hub, radius_device, randomRange) => {

  const generateX = (center_x, center_y, radius, radian) => parseInt(radius.horizontal * Math.cos(radian)) + center_x;
  const generateY = (center_x, center_y, radius, radian) => parseInt(radius.vertical * Math.sin(radian)) + center_y;

  let totalHubCount = 0;
  let totalDeviceCount = 0;
  let totalOuterNodeCount = 0;
  hubData.forEach(hub => {
    if (hub.devices.length === 0) totalOuterNodeCount += 1;
    totalOuterNodeCount += hub.devices.length;
    totalHubCount += 1;
    totalDeviceCount += hub.devices.length;
  })

  console.log("hub count", totalHubCount)
  console.log("device count", totalDeviceCount)

  let nodeDataGenerated = {
    nodes: [],
    links: []
  }

  const radian_hub_gap = Math.PI * 2 / totalHubCount;
  const radian_device_gap = Math.PI * 2 / (totalOuterNodeCount);

  let i;
  let radian_device_start = 0;

  console.log("initial data: ", nodeDataGenerated);
  nodeDataGenerated["nodes"].push(
    {
      id: CENTER_ID,
      x: center_x,
      y: center_y,
      size: 600,
      color: "red",
      type: "center"
    }
  );

  console.log("First node added: ", nodeDataGenerated);

  for (i = 0; i < totalHubCount; i++) {
    const hub = hubData[i];

    //generate hub_radian using hub.devices.size 
    let hub_radian;
    if (hub.devices.length === 0)
      hub_radian = (2 * radian_device_start + 1 * radian_device_gap) / 2;
    else
      hub_radian = (2 * radian_device_start + ((hub.devices.length - 1) * radian_device_gap)) / 2;

    console.log(radian_device_start / Math.PI / 2 * 360, hub.devices.length, radian_device_gap / Math.PI / 2 * 360);
    console.log("Current hub_radian: ", hub_radian / Math.PI / 2 * 360);

    let hub_x = generateX(center_x, center_y, radius_hub, hub_radian);
    let hub_y = generateY(center_x, center_y, radius_hub, hub_radian);


    // add hub node
    nodeDataGenerated["nodes"].push(
      {
        id: hub.name,
        _id: hub._id,
        description: hub.description,
        ipAddress: hub.ipAddress,
        port: hub.port,
        lastModified: hub.lastModified,
        devices: hub.devices,
        x: hub_x,
        y: hub_y,
        size: 500,
        color: "green",
        type: "hub",
      }
    );

    // add link from center to hub
    nodeDataGenerated["links"].push(
      {
        source: CENTER_ID,
        target: hub.name,
      }
    );


    hub.devices.forEach(device => {
      let device_x = generateX(center_x, center_y, radius_device, radian_device_start);
      let device_y = generateY(center_x, center_y, radius_device, radian_device_start);

      // add device node
      nodeDataGenerated["nodes"].push(
        {
          id: device.name,
          _id: device._id,
          description: device.description,
          ipAddress: device.ipAddress,
          port: device.port,
          lastModified: device.lastModified,
          x: device_x,
          y: device_y,
          size: 400,
          color: "#877cd6",
          type: "device",
        }
      );

      // add link from hub to device
      nodeDataGenerated["links"].push(
        {
          source: hub.name,
          target: device.name,
        }
      );

      radian_device_start += radian_device_gap;
      // console.log("Current node: " + device.name + " Current radian" + radian_device_start);
    });

    if (hub.devices.length === 0) {
      // console.log("Add a gap for ", hub.name);
      radian_device_start += radian_device_gap;

    }

    // console.log("Current node: " + hub.name + " Current radian" + radian_device_start);
  }

  // outer most deviceNode gap for hub with no devices
  console.log("data generated: ", nodeDataGenerated);
  return nodeDataGenerated;
}


const ContainerStyle = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  min-height: 500px;
  min-width: 500px;
`

const findByNodeId = (device, id) => {
  return device.id === id;
}

export default function () {
  const [data, setData] = useState(null);
  const [currentNodeData, setCurrentNodeData] = useState(null);

  const setCurrentDataState = (nodeId) => {
    const device = data["nodes"].find(element => findByNodeId(element, nodeId));
    console.log("device is :", device);
    setCurrentNodeData(device);
  }

  useEffect(() => {
    try {
      fetchAllHubs().then(res => {
        // process data
        console.log("Hubs data: ", res);
        const dataGenerated = nodesPositioning(res, CENTER_X, CENTER_Y, RADIUS_HUB, RADIUS_DEVICE, RANDOM_RANGE);
        // const dataGenerated = nodesPositioning(dummyHubData, CENTER_X, CENTER_Y, RADIUS_HUB, RADIUS_DEVICE, RANDOM_RANGE);
        setData(dataGenerated);
        if(dataGenerated.nodes.length > 1) setCurrentNodeData(dataGenerated.nodes[1]);
        else setCurrentNodeData(dataGenerated.nodes[0]);
      });
    } catch{
      console.log("fail fetching data");
    }
  }, []);

  // graph event callbacks
  const onClickGraph = function () {
    console.log('Clicked the graph background');
  };

  const onClickNode = function (nodeId) {
    console.log('Clicked node ${nodeId}');
    setCurrentDataState(nodeId);
  };

  const onDoubleClickNode = function (nodeId) {
    console.log('Double clicked node ${nodeId}');
  };

  const onRightClickNode = function (event, nodeId) {
    console.log('Right clicked node ${nodeId}');
  };

  const onMouseOverNode = function (nodeId) {
    console.log('Mouse over node ${nodeId}');
  };

  const onMouseOutNode = function (nodeId) {
    console.log('Mouse out node ${nodeId}');
  };

  const onClickLink = function (source, target) {
    console.log('Clicked link between ${source} and ${target}');
  };

  const onRightClickLink = function (event, source, target) {
    console.log('Right clicked link between ${source} and ${target}');
  };

  const onMouseOverLink = function (source, target) {
    console.log('Mouse over in link between ${source} and ${target}');
  };

  const onMouseOutLink = function (source, target) {
    console.log('Mouse out link between ${source} and ${target}');
  };

  const onNodePositionChange = function (nodeId, x, y) {
    console.log('Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}');
  };

  if (data === null) return <LoadingPage />
  else return (
    <ContainerStyle>
      <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={data}
        svg='assets/pi.svg'
        config={GRAPG_CONFIG}
        onClickNode={onClickNode}
        onDoubleClickNode={onDoubleClickNode}
        onRightClickNode={onRightClickNode}
        onClickGraph={onClickGraph}
        onClickLink={onClickLink}
        onRightClickLink={onRightClickLink}
        onMouseOverNode={onMouseOverNode}
        onMouseOutNode={onMouseOutNode}
        onMouseOverLink={onMouseOverLink}
        onMouseOutLink={onMouseOutLink}
        onNodePositionChange={onNodePositionChange}
      />
      <InfoSection node={currentNodeData}>
      </InfoSection>
    </ContainerStyle>
  )
}