import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import DetailsPage from "./pages/DetailsPage";
import MainNavigation from "./components/Navigation/MainNavigation";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <section className="mainContent">
        <Switch>
          <Redirect from="/" to="/auth" exact />}
          <Route exact path="/auth" component={AuthPage} />
          <Route exact path="/subscriptions" component={SubscriptionsPage} />
          <Route exact path="/subscriptions/:sid" component={DetailsPage} />
        </Switch>
      </section>
    </BrowserRouter>
  );
};

export default App;
