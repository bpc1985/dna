import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import MainNavigation from "./components/Navigation/MainNavigation";

import { fetchUserData } from "./utils";

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
        if (!state.isAuthenticated) {
          const res = await fetchUserData();
          setState({ isAuthenticated: true, isAuthenticating: false });
        }
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
          isAuthenticated={state.isAuthenticated}
        />
        <section className="mainContent">
          <Routes
            userHasAuthenticated={userHasAuthenticated}
            isAuthenticated={state.isAuthenticated}
          />
        </section>
      </BrowserRouter>
    )
  );
};

export default App;
