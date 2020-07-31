import React, {
  Suspense,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Appbar from "./components/Appbar";
import BackgroundPage from "./components/BackgroundPage";
import LoadingPage from "./components/LoadingPage";
import { AuthContext } from "./contexts/auth-context";
import { useAuth } from "./hooks/auth-hook";

/**
 * Lazy loading to allows code splitting in chunk.
 */
const Home = React.lazy(() => import("./views/Home"));
const Authentication = React.lazy(() => import("./views/Authentication"));
const TableView = React.lazy(() => import("./views/TableView"));
const Hub = React.lazy(() => import("./views/Hub"));
const Network = React.lazy(() => import("./views/Network"));
const Error = React.lazy(() => import("./views/Error"));

const App = () => {
  const { token, login, logout, userId, userName } = useAuth();
  let routes;

  if (token || localStorage.getItem('userData')) {
    routes = (
      <Switch>
        <Route path="/manage" exact>
          <TableView />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/hub/:hubId" exact>
          <Hub />
        </Route>
        <Route path="/error" exact>
          <Error />
        </Route>
        <Route path="/network" exact>
          <Network />
        </Route>
        <Route path="/table" exact>
          <TableView />
        </Route>
        <Redirect to={window.location.pathname} />
      </Switch>
    );
  } else {
    // Visitors are only allowed to access home page and login page
    routes = (
      <Switch>
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
        logout: logout,
      }}
    >
      <Router>
        <BackgroundPage>
          <Appbar />
          <main>
            <Suspense fallback={<LoadingPage />}>{routes}</Suspense>
          </main>
        </BackgroundPage>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
