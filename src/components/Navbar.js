import React from 'react';
import styled, { css } from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function LinkButton(props) {
  let history = useHistory();
  function handleClick() {
    history.push(props.link);
  }
  return (
    <Button color="inherit" onClick={handleClick}>
      {props.text}
    </Button>
  );
}

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#24292E' }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            IoT Dash
          </Typography>
          <LinkButton link="/main" text="Main" />
          <LinkButton link="/devices" text="Devices" />
          <LinkButton link="/login" text="Login" />
        </Toolbar>
      </AppBar>
    </div>
  );
}
