import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContext } from './assets/contexts/auth-context';
import Main from './views/Main'
import Manage from './views/Manage';
import NewDevice from './views/NewDevice';
import EditDevice from './views/EditDevice';
import Authentication from './views/Authentication';
import Device from './views/Device';
import Error from './views/Error';
import BackgroundPage from './components/BackgroundPage';

function App() {
  let routes;

  routes =
    <Switch>
      <Route path="/devices" exact>
        <Manage />
      </Route>
      <Route path="/main" exact>
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
      <Route path="/login" exact>
        <Authentication />
      </Route>
      <Route path="/error" exact>
        <Error />
      </Route>
      <Redirect to="/devices" />

    </Switch>

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: true,
      }}
    >
      <Router>
        <Navbar />
        <BackgroundPage>
          <main>{routes}</main>
        </BackgroundPage>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
