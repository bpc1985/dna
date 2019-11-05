import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { postLogOut } from "../../utils";

export default function Logout({userHasAuthenticated}) {
  const [navigate, setNavigate] = useState(false);

  const logOut = async () => {
    userHasAuthenticated(false);
    await postLogOut();
    localStorage.removeItem("token");
    setNavigate(true);
  };

  if (navigate) {
    return <Redirect to="/login" push={true} />;
  }

  return <button onClick={logOut}>Logout</button>;
}
