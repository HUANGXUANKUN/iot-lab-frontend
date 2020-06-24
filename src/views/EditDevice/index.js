import React from "react";
import { useForm } from "react-hook-form";
import { useHistory,useLocation } from "react-router-dom";
import styled from 'styled-components';
import { editDevice } from "../../assets/apis/backend-api";


const GridStyle = styled.div`
  align-content: center;
  align-items:center;
  display: grid;
  text-align: center; 
  padding: 10px;
  font-size: 12pt;
  justify-items: left;
  grid-column-gap:10px;
  grid-row-gap:10px;
  grid-template-columns: 1fr; 
`

const FormStyle = styled.div`
  max-width: 400px;
  margin: 0 auto;
`

export default function EditDevice(props) {
  let history = useHistory();
  const location = useLocation();
  const { id, name, ipAddress, port, description } = location.state.device;
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data, e) => {
    data.id = id;
    console.log(data);
    editDevice(data);
    e.target.reset();
    history.push("/devices");
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
