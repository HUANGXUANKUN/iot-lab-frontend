import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import BackgroundPage from './components/BackgroundPage';
import LoadingPage from './components/LoadingPage';
import { AuthContext } from './assets/contexts/auth-context';
import { useAuth } from './assets/hooks/auth-hook';

/**
 * Lazy loading to allows code splitting in chunk. 
 */
const Main = React.lazy(() => import('./views/Main'))
const Manage = React.lazy(() => import('./views/Manage'))
const NewHub = React.lazy(() => import('./views/NewHub'))
const Authentication = React.lazy(() => import('./views/Authentication'))
const Device = React.lazy(() => import('./views/Device'))
const Network = React.lazy(() => import('./views/Network'))
const Error = React.lazy(() => import('./views/Error'))


const App = () => {
  const { token, login, logout, userId, userName } = useAuth();
  let routes;

  // if user is login
  if (token) {
    { console.log("Has token") }
    routes =
      <Switch>
        <Route path="/devices" exact>
          <Manage />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/hub/new" exact>
          <NewHub />
        </Route>
        <Route path="/device/:deviceId" exact>
          <Device />
        </Route>
        <Route path="/error" exact>
          <Error />
        </Route>
        <Route path="/network" exact>
          <Network />
        </Route>
        <Redirect to="/network" />
      </Switch>
  } else {
    // Visitors are only allowed to access home page and login page
    { console.log("No token") }
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
          <main>
            <Suspense fallback={<LoadingPage />}>
              {routes}
            </Suspense>
          </main>
        </BackgroundPage>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
