import React from "react";
import { useForm } from "react-hook-form";
import styled from 'styled-components';
import { createDevice } from "../../assets/apis/device-api";
import { useHistory } from 'react-router-dom';


const GridStyle = styled.div`
  display: grid;
  padding: 10px;
  font-size: 12pt;
  justify-items: center;
  grid-column-gap:10px;
  grid-row-gap:10px;
  grid-template-columns: 1fr; 
`

const FormStyle = styled.div`
  max-width: 400px;
  margin: 0 auto;
`

export default function NewDevice() {
  let history = useHistory();
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const onSubmit = (data,e) => {
    console.log(data);
    createDevice(data);
    e.target.reset();
    history.push("/devices");
  }; //form submit function which will invoke after successful validation


  // console.log("name: ", watch("name")); //watch individual input by pass the name of the input

  return (
    <FormStyle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <GridStyle>
          <label>Name</label>
          <input name="name" defaultValue="" ref={register} />

          <label>id</label>
          <input name="id" defaultValue="" ref={register} />

          <label>Description</label>
          <input
            name="description"
            defaultValue=""
            ref={register({ required: true, maxLength: 50 })}
          />

          <label>IP address</label>
          <input
            name="ipAddress"
            defaultValue="192.27.221.30"
            ref={register({ required: true, maxLength: 20 })}
          />

          <label>Port</label>
          <input
            name="port"
            defaultValue="3000"
            ref={register({ required: true, maxLength: 4 })}
          />

          <label>Value</label>
          <input
            name="value"
            defaultValue="0"
            ref={register({ required: true, maxLength: 10 })}
          />
          <input type="submit" />
        </GridStyle>
      </form>
    </FormStyle>

  );
}
