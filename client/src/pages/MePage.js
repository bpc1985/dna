import React, { useState, useEffect } from "react";
import Loading from '../components/Loading/Loading';
import { fetchUserData } from "../utils";

import "./MePage.scss";

export default function MePage() {
  const [state, setState] = useState();

  useEffect(() => {
    async function fetchMe() {
      const data = await fetchUserData();
      setState(data);
    }
    fetchMe();

    return () => {};
  }, []);

  if (!state) {
    return <Loading />;
  }
  return state && (
    <>
      <h2>My Account</h2>
      <div className="account">
        <div>First Name: {state.first_name}</div>
        <div>Last Name: {state.last_name}</div>
        <div>Email: {state.email}</div>
      </div>
    </>
  );
}
