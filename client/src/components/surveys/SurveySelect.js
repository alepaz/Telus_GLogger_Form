// SurveyField contains logic to render a single
// label and text input
import React from "react";

export default ({
  input,
  label,
  meta: { touched, error },
  children
}) => (
  <div>
    <label>{label}</label>
    <div className="control">
      <div className={"select " + (touched ? (error ? "is-danger" : "is-success") : "")}>
        <select className="browser-default" {...input}>{children}</select>
        {touched && (error && <p className="help is-danger">{error}</p>)}
      </div>
    </div>
  </div>
);
