import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import DetailsPage from "./pages/DetailsPage";
import MePage from "./pages/MePage";

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

const Routes = ({isAuthenticated, userHasAuthenticated}) => {
  return (
    <Switch>
      <Redirect from="/" to="/subscriptions" exact />
      <Route
        exact
        path="/login"
        render={props => (
          <AuthPage {...props} userHasAuthenticated={userHasAuthenticated} />
        )}
      />
      <AuthenticatedRoute
        exact
        path="/subscriptions"
        component={SubscriptionsPage}
        props={{ isAuthenticated }}
      />
      <AuthenticatedRoute
        exact
        path="/subscriptions/:sid"
        component={DetailsPage}
        props={{ isAuthenticated }}
      />
      <AuthenticatedRoute
        exact
        path="/me"
        component={MePage}
        props={{ isAuthenticated }}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Routes;
