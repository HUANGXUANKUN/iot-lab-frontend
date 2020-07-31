import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import { AuthContext } from "../../contexts/auth-context";
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
import { useHttpClient } from '../../hooks/http-hook';

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
  text-align: center;
`;


const Auth = (props) => {
  const auth = useContext(AuthContext);
  const { control, register, handleSubmit, watch, errors, reset } = useForm();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  let history = useHistory();
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
      history.push("/");
    } catch (err) {
      console.log(err);
      alert(err.message);
     }
  };


  return (
    <Form>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormStyle>
          <h1>Login</h1>
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
              placeholder="password"
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
