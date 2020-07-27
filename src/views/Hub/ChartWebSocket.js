import io from "socket.io-client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Chip from "@material-ui/core/Chip";
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import LoadingSection from "../../components/LoadingSection";

const Container = styled.div`
  margin: 10px;
`;

const ChartWebSocket = (props) => {
  const [data, setData] = useState([]);
  const [dateMessage, setDateMessage] = useState("");
  const [currentValue, setCurrentValue] = useState(null);
  const [connectionLink, setConnectionLink] = useState(null);
  const [device, setDevice] = useState(null);
  const [hub, setHub] = useState(null);

  const socketRef = useRef(null);

  let socket = null;

  // 1. listen for a cpu event and update the state
  useEffect(() => {
    if (socketRef.current !== null) {
      console.log("There are socket connection:", socketRef.current);
      console.log("disconnecting...");
      socketRef.current.on("disconnect", function () {});
      socketRef.current.close();
    }
    setData([]);
    setCurrentValue("");
    setDateMessage(null);
    setConnectionLink(null);

    if (props.device) {
      const link =
        "http://" + props.hub.ipAddress + ":" + (Number(props.hub.port) + 100);
      setConnectionLink(link);
      console.log("link", link);
      socket = io(link, {
        transports: ["websocket", "polling"],
      });

      socket.on("date", (response) => {
        const date = new Date(Number(response.value));
        const localDateString = date.toLocaleDateString();
        const localTimeString = date.toLocaleTimeString();
        const formattedTime = localDateString + " " + localTimeString;
        const seconds = date.getSeconds();

        setData((currentData) => {
          let newDataSet = [...currentData];
          newDataSet.push({ value: seconds });
          newDataSet = newDataSet.slice(Math.max(newDataSet.length - 10, 0));
          return newDataSet;
        });
        setDateMessage(formattedTime);
        setCurrentValue(seconds);
      });
    }
    return () => {
      socketRef.current = socket;
    };
  }, [props.hub, props.device]);

  const chartWidth = Math.floor((window.innerWidth - 600) / 2);
  const chartHeight = Math.floor((window.innerHeight - 130) / 2 - 150);

  return (
    <Container>
      <div style={{ margin: "10px" }}>
        <div style={{ display: "flex" }}>
          <Chip style={{backgroundColor:"#1976D1"}} size="small" label="WebSocket Polling" color="primary" />
          <div style={{ margin: "0px 10px" }}>
            {connectionLink}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100px", display: "flex" }}>
            Value:
            <div style={{ fontWeight: "bold", margin: "0px 5px" }}>
              {currentValue}
            </div>
          </div>
          <div style={{ width: "400px", display: "flex" }}>
            Last Fetch:{" "}
            <div style={{ fontWeight: "bold", margin: "0px 5px" }}>
              {dateMessage}
            </div>
          </div>
        </div>
      </div>
      <LineChart width={chartWidth} height={chartHeight} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </Container>
  );
};

export default ChartWebSocket;
