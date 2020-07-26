import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { AuthContext } from './../assets/contexts/auth-context';

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

const LoginLink = props => <Link to="/login" {...props} />
const ManageLink = props => <Link to="/manage" {...props} />
const NetworkLink = props => <Link to="/network" {...props} />
const HomeLink = props => <Link to="/" {...props} />
const TableViewLink = props => <Link to="/table" {...props} />


export default function MenuAppBar() {
  const authContext = useContext(AuthContext);
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);



  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // authContext.logout();
    setAnchorEl(null);
  };


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
          <Tooltip title="homepage">
            <IconButton aria-label="homepage" component={HomeLink} color="inherit">
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="network diagram">
            <IconButton aria-label="network diagram" component={NetworkLink} color="inherit">
              <BubbleChartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="manage page">
            <IconButton aria-label="manage page" component={ManageLink} color="inherit">
              <CreateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="table view">
            <IconButton aria-label="table view" component={TableViewLink} color="inherit">
              <ListIcon />
            </IconButton>
          </Tooltip>
          {!authContext.isLoggedIn && (<Button component={LoginLink} color="inherit"> Login </Button>)}
          {authContext.isLoggedIn && (
            <div>
              <IconButton
                aria-label="userLogged in"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{ fontSize: 16 }}
              >
                <AccountCircle />
                {authContext.userName}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={authContext.logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
