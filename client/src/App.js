import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import DetailsPage from "./pages/DetailsPage";
import MePage from "./pages/MePage";
import MainNavigation from "./components/Navigation/MainNavigation";

import { fetchUserData } from "./utils";

import "./App.scss";

const AuthenticatedRoute = ({
  component: Component,
  props: cProps,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        cProps.isAuthenticated ? (
          <Component {...props} {...cProps} />
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${props.location.search}`}
          />
        )
      }
    />
  );
};

const initialState = {
  isAuthenticated: false,
  isAuthenticating: true
};

const App = () => {
  const [state, setState] = useState(initialState);

  const userHasAuthenticated = authenticated => {
    setState({ ...state, isAuthenticated: authenticated });
  };

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetchUserData();
        setState({ isAuthenticated: true, isAuthenticating: false });
      } catch (e) {
        setState({ ...state, isAuthenticating: false });
      }
    }
    fetchMe();

    return () => {};
  }, []);

  return (
    !state.isAuthenticating && (
      <BrowserRouter>
        <MainNavigation
          userHasAuthenticated={userHasAuthenticated}
          {...state}
        />
        <section className="mainContent">
          <Switch>
            <Redirect from="/" to="/subscriptions" exact />
            <Route
              exact
              path="/login"
              render={props => (
                <AuthPage
                  {...props}
                  userHasAuthenticated={userHasAuthenticated}
                />
              )}
            />
            <AuthenticatedRoute
              exact
              path="/subscriptions"
              component={SubscriptionsPage}
              props={{ ...state }}
            />
            <AuthenticatedRoute
              exact
              path="/subscriptions/:sid"
              component={DetailsPage}
              props={{ ...state }}
            />
            <AuthenticatedRoute
              exact
              path="/me"
              component={MePage}
              props={{ ...state }}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </section>
      </BrowserRouter>
    )
  );
};

export default App;
