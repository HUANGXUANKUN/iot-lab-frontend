import React from "react";
import { useForm } from "react-hook-form";
import { useHistory,useLocation } from "react-router-dom";
import styled from 'styled-components';
import { editDevice } from "../../apis/device-api";


const GridStyle = styled.div`
  align-content: center;
  align-items:center;
  display: grid;
  /* width: 100;
  margin: 0; */
  text-align: center; 
  padding: 10px;
  font-size: 16pt;
  justify-items: center;
  grid-column-gap:10px;
  grid-row-gap:10px;
  grid-template-columns: 1fr; 
`

const FormStyle = styled.div`
  width: 100%;
  margin: 0 auto;
`

export default function EditDevice(props) {
  let history = useHistory();
  const location = useLocation();
  const { _id, name, ipAddress, port, description } = location.state.device;
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    data.id = _id;
    console.log(data);
    try {
      editDevice(data).then(res => {
        console.log(res);
        e.target.reset();
        history.push("/devices");
      });
    }catch{
      console.log("Fail creating device.");
    }
  }; //form submit function which will invoke after successful validation

  return (
    <FormStyle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridStyle>
          <label>Name</label>
          <input name="name" defaultValue={name} ref={register} />

          <label>Description</label>
          <input
            name="description"
            defaultValue={description}
            ref={register({ required: true, maxLength: 50 })}
          />

          <label>IP address</label>
          <input
            name="ipAddress"
            defaultValue={ipAddress}
            ref={register({ required: true, maxLength: 20 })}
          />

          <label>Port</label>
          <input
            name="port"
            defaultValue={port}
            ref={register({ required: true, maxLength: 4 })}
          />
          <input type="submit" />
        </GridStyle>
      </form>
    </FormStyle>

  );
}
