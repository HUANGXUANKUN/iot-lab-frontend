import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import Card from "../../components/UIElements/Card";
import ErrorModal from "../../components/UIElements/ErrorModal";
import LoadingSpinner from "../../components/UIElements/LoadingSpinner";
import { AuthContext } from "../../assets/contexts/auth-context";
import { Form, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import clsx from "clsx";
import { useHttpClient } from '../../assets/hooks/http-hook';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const FormStyle = styled.div`
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
`;


const Auth = (props) => {
  const auth = useContext(AuthContext);
  const { control, register, handleSubmit, watch, errors, reset } = useForm();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const classes = useStyles();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmitHandler = async (data, event) => {
    event.preventDefault();
    console.log("submitting...");
    // const link = `${process.env.REACT_APP_BACKEND_API_KEY}/user/login`;
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email: data.email,
    //     password: data.password,
    //   }),
    // };
    // console.log("submitting...2");
    // try {
    //   const response = await fetch(link, requestOptions);
    //   console.log("gotten response,", response);
    //   return response;
    // } catch (err) {
    //   // console.log("fetch data failed!", err);
    //   throw err;
    // }
  
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API_KEY}/user/login`,
        'POST',
        JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      auth.login(responseData.userId, responseData.userName, responseData.token);
    } catch (err) {
      console.log(err);
      alert(err.message);
     }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("data", data);
    try {
      onSubmitHandler(data);
      // onSubmitHandler(data).then((response) => {
      //   console.log("response is:", response.json());
      //   if(!response.ok) throw new Error(response.json());
      //   const responseData = response.json();
      //   auth.login(responseData.userId, responseData.userName, responseData.token);
      // });
    } catch (err) {
      console.log("fail to login: ", err);
      alert("Login fails! Please try again!");
    }
  }; //form submit function which will invoke after successful validation

  // {/* <form onSubmit={onSubmitHandler}> */}
  return (
    <Form>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormStyle>
          <TextField
            inputRef={register({ required: true })}
            name="email"
            id="email"
            label="email"
            variant="outlined"
            fullWidth
            className={classes.margin}
          />
          <div className={classes.margin} style={{color:"red"}}>
            {errors.email && "email is required"}
          </div>

          <FormControl fullWidth className={classes.margin}>
            <FilledInput
              error
              inputRef={register({ required: true })}
              name="password"
              id="standard-adornment-amount"
              value={values.amount}
              type={values.showPassword ? "text" : "password"}
              onChange={handleChange("amount")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className={classes.margin} style={{color:"red"}}>
            {errors.password && "password is required"}
          </div>
          <div style={{marginRight:0, marginLeft:"auto", minWidth:50, maxWidth:50}}>
            <Button
              variant="outline-dark"
              size="sm"
              type="submit">
              Submit
            </Button>
          </div>
        </FormStyle>
      </form>
    </Form>
  );
};

export default Auth;
