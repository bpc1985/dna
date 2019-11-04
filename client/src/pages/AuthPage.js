import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { fetchData } from "../utils";

import "./AuthPage.scss";

export default function AuthPage(props) {
  const [authenticated, setAuthenticated] = useState(true);
  const [users, setUsers] = useState();

  useEffect(() => {
    async function fetchUsers() {
      const data = await fetchData("users");
      setUsers(data);
    }
    fetchUsers();

    return () => {};
  }, []);

  const submitHandler = values => {
    const foundUser = users.find(user => {
      return user.email === values.email && user.password === values.password;
    });
    if (foundUser) {
      props.history.push("/subscriptions");
    } else {
      setAuthenticated(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Email should be in right format")
          .required("Email is required"),
        password: Yup.string()
          .min(4, "Password must be 4 characters or more")
          .required("Password is required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        submitHandler(values);
        setSubmitting(false);
      }}
    >
      <Form className="authForm">
        {!authenticated && <div className="formControl">
          <div className="errorMessage">Ops! Something is wrong with your email or password</div>
        </div>}
        <div className="formControl">
          <label htmlFor="email">E-Mail</label>
          <Field name="email" type="text" />
          <ErrorMessage component="div" name="email" className="errorMessage" />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" />
          <ErrorMessage component="div" name="password" className="errorMessage" />
        </div>
        <div className="formActions">
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
}
