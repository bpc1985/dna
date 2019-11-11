import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { postLogIn, getUrlParams } from "../utils";

import "./AuthPage.scss";

export default function AuthPage(props) {
  const params = getUrlParams(props.location.search);
  const [status, setStatus] = useState(true);

  const submitHandler = async (values) => {
    try {
      const res = await postLogIn({
        email: values.email,
        password: values.password
      });
      localStorage.setItem('token', res.token);
      props.userHasAuthenticated(true);
      props.history.push(params.redirect || '/');
    } catch (e) {
      setStatus(false);
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
          .min(7, "Password must be 7 characters or more")
          .required("Password is required")
      })}
      onSubmit={(values, { setSubmitting }) => {
        submitHandler(values);
        setSubmitting(false);
      }}
    >
      <Form className="authForm">
        {!status && <div className="formControl">
          <div className="errorMessage">Ops! Something is wrong with your email or password</div>
        </div>}
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="text" />
          <ErrorMessage component="div" name="email" className="errorMessage" data-testid="emailError" />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />
          <ErrorMessage component="div" name="password" className="errorMessage" data-testid="passwordError" />
        </div>
        <div className="formActions">
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Formik>
  );
}
