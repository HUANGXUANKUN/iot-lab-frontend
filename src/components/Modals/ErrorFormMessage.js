import React, { useState, useEffect } from "react";

const ErrorMessage = (props) => {
  let errorText = <></>;
  let errorTextMessage = [];
  if (props.errors === null || props.errors.length === 0) {
    console.log("no form errors");
    errorText = <div></div>;
  } else {
    errorTextMessage=[];
    Object.keys(props.errors).map((key) => (
        errorTextMessage.push("Invalid "+key)
      ))
    console.log("errorTextMessage",errorTextMessage);
    errorText = (
      <div style={{ color: "red", textAlign: "left" }}>
        {errorTextMessage.map((message) => (
            <div>{message}</div>
          ))}
      </div>
    );
  }
  return errorText;
};

export default ErrorMessage;
