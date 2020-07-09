import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Graph } from "react-d3-graph";
import InfoSection from './InfoSection';

const images = {
  pi: 'https://p1.hiclipart.com/preview/405/624/904/user-icon-circle-icon-os-icon-pi-icon-raspberry-icon-round-icon-icon-raspberry-pi-computer-icons-png-clipart.jpg',
  device1: 'data:image/jpeg;base64,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',
  device2: 'data:image/jpeg;base64,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',
  device3: 'data:image/png;base64,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',
}

const ContainerStyle = styled.div`
  display: grid;
  grid-template-columns: 8fr  2fr; 
  margin: 50px;
`


// graph payload (with minimalist structure)
const data = {
  nodes: [
    { id: "NUS-Singtel-Hub", color: "#ff0000", type: "HUB", description: "A Lab in NUS", ipAddress: "192.128.25.13" },
    {
      id: "Respberry-PI-1",
      svg: images.pi,
      type: "PI", description: "A Lab in NUS", ipAddress: "192.128.25.13"
    },
    {
      id: "Respberry-PI-2",
      svg: images.pi,
      type: "PI", description: "A Lab in NUS", ipAddress: "192.128.25.13"
    },
    {
      id: "Device-1",
      svg: images.device1,
      type: "DEVICE", value: 1, description: "Thermometer", ipAddress: "192.128.25.13", port: 3000, lastModified: "Just Now"
    },
    {
      id: "Device-2",
      svg: images.device2,
      type: "DEVICE", value: 2, description: "Infra-red sensor", ipAddress: "192.128.25.14", port: 3001, lastModified: "Today"
    },
    {
      id: "Device-3",
      svg: images.device3,
      type: "DEVICE", value: 3, description: "Dummy device 3", ipAddress: "192.128.25.15", port: 3002, lastModified: "Yesterday"
    },
    {
      id: "Device-4",
      svg: images.device3,
      type: "DEVICE", value: 4, description: "Whatever", ipAddress: "192.128.25.16", port: 3003, lastModified: "Just Now"
    },
    {
      id: "Device-5",
      svg: images.device3,
      type: "DEVICE", value: 5, description: "Cool dummy thing", ipAddress: "192.128.25.17", port: 3004, lastModified: "Just Now"
    },
    {
      id: "Device-6",
      svg: images.device3,
      type: "DEVICE", value: 6, description: "Anything is fine", ipAddress: "192.128.25.18", port: 3005, lastModified: "Just Now"
    },
  ],
  links: [
    { source: "NUS-Singtel-Hub", target: "Respberry-PI-1" },
    { source: "NUS-Singtel-Hub", target: "Respberry-PI-2" },
    { source: "Respberry-PI-1", target: "Device-1" },
    { source: "Respberry-PI-1", target: "Device-2" },
    { source: "Respberry-PI-1", target: "Device-3" },
    { source: "Respberry-PI-2", target: "Device-4" },
    { source: "Respberry-PI-2", target: "Device-5" },
    { source: "Respberry-PI-2", target: "Device-6" },
  ],
};

const myConfig = {
  
  nodeHighlightBehavior: true,
  height: 800,
  width: 1200,
  node: {
    color: "lightgreen",
    size: 500,
    fontSize : 14,
    highlightStrokeColor: "blue",
  },
  link: {
    highlightColor: "lightblue",
    fontWeight: "bold",
    strokeWidth: 2,
  },
  d3: {
    "alphaTarget": 0.05,
    "gravity": -100,
    "linkLength": 300,
    "linkStrength": 1,
    "disableLinkForce": false
  },
};

const findByNodeId = (device, id) => {
  return device.id === id;
}

export default function () {
  const [currentNodeData, setCurrentNodeData] = useState(data["nodes"][0]);

  const setCurrentDataState = (nodeId) => {
    const device = data["nodes"].find(element => findByNodeId(element, nodeId));
    console.log("device is :", device);
    setCurrentNodeData(device);
  }
  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used

  // graph event callbacks
  const onClickGraph = function () {
    // window.alert(`Clicked the graph background`);
    console.log('Clicked the graph background');
  };

  const onClickNode = function (nodeId) {
    // window.alert(`Clicked node ${nodeId}`);
    console.log('Clicked node ${nodeId}');
    setCurrentDataState(nodeId);
  };

  const onDoubleClickNode = function (nodeId) {
    // window.alert(`Double clicked node ${nodeId}`);
    console.log('Double clicked node ${nodeId}');
  };

  const onRightClickNode = function (event, nodeId) {
    // window.alert(`Right clicked node ${nodeId}`);
    console.log('Right clicked node ${nodeId}');
  };

  const onMouseOverNode = function (nodeId) {
    // window.alert(`Mouse over node ${nodeId}`);
    console.log('Mouse over node ${nodeId}');
    setCurrentDataState(nodeId);
  };

  const onMouseOutNode = function (nodeId) {
    // window.alert(`Mouse out node ${nodeId}`);
    console.log('Mouse out node ${nodeId}');
  };

  const onClickLink = function (source, target) {
    // window.alert(`Clicked link between ${source} and ${target}`);
    console.log('Clicked link between ${source} and ${target}');
  };

  const onRightClickLink = function (event, source, target) {
    // window.alert(`Right clicked link between ${source} and ${target}`);
    console.log('Right clicked link between ${source} and ${target}');
  };

  const onMouseOverLink = function (source, target) {
    // window.alert(`Mouse over in link between ${source} and ${target}`);
    console.log('Mouse over in link between ${source} and ${target}');
  };

  const onMouseOutLink = function (source, target) {
    // window.alert(`Mouse out link between ${source} and ${target}`);
    console.log('Mouse out link between ${source} and ${target}');
  };

  const onNodePositionChange = function (nodeId, x, y) {
    // window.alert(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`);
    console.log('Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}');
  };

  return (
    <ContainerStyle>
      <Graph
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={data}
        svg='assets/pi.svg'
        config={myConfig}
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