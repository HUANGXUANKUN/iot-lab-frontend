import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './views/Main'
import Manage from './views/Manage';
import NewDevice from './views/NewDevice';
import EditDevice from './views/EditDevice';
import Authentication from './views/Authentication';
import Device from './views/Device';
import Error from './views/Error';
import BackgroundPage from './components/BackgroundPage';
import { AuthContext } from './assets/contexts/auth-context';
import { useAuth } from './assets/hooks/auth-hook';

function App() {
  const { token, login, logout, userId, userName } = useAuth();
  let routes;

  // if user is login
  if (token) {
    {console.log("Has token")}
    routes =
      <Switch>
        <Route path="/devices" exact>
          <Manage />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/device/new" exact>
          <NewDevice />
        </Route>
        <Route path="/device/edit" exact>
          <EditDevice />
        </Route>
        <Route path="/device/:deviceId" exact>
          <Device />
        </Route>
        <Route path="/error" exact>
          <Error />
        </Route>
        <Redirect to="/devices" />
      </Switch>
  } else {
    // Visitors are only allowed to access home page and login page
    {console.log("No token")}
    routes = (
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/login">
          <Authentication />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <BackgroundPage>
          <Navbar />
          <main>{routes}</main>
        </BackgroundPage>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
