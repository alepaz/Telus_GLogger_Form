import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";

// mapping example
// r => ({
//   value: r.employeeID,
//   label: `${r.firstName} ${r.secondName} ${r.lastName}`
// })

// service example
// employeeService.getEmployees(params)

function SurveyAsyncSelectable({
  input: field,
  label,
  mapping,
  meta: { touched, error },
  name,
  input: { onChange, value },
  service
}) {
  const getOptions = async input => {
    if (!input || input.length < 3) {
      return [];
    }
    try {
      const params = { filter: input, limit: 10 };
      const request = await service(params);
      const resources = request.data;
      const options = resources.map(mapping);
      return options;
    } catch (err) {
      console.error(err);
      return [];
    }
  };
  const handleChange = async option => {
    if (option) {
      const { value: optionValue } = option; 
      // considering that RF cannot handle object with keys {value, label}
      // you are going to need to filter resources by the selected value
      // in order to display the correct label in the UI
      onChange(optionValue);
    }
  };

  return (
    <div>
      <label>{label}</label>
      <div className="control">
        <div
          className={
            "select " + (touched ? (error ? "is-danger" : "is-success") : "")
          }
        >
          <AsyncSelect
            id={name}
            isClearable
            className="browser-default"
            loadOptions={debounce(getOptions, 300)}
            name={`selectable-${name}`}
            onChange={debounce(handleChange, 300)}
            value={{ label: value, value }}
          />
          <div className="red-text" style={{ marginBottom: "10px" }}>
            {touched && error ? error : null}
          </div>
        </div>
      </div>
    </div>
  );
}

SurveyAsyncSelectable.propTypes = {
  label: PropTypes.string.isRequired,
  mapping: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  service: PropTypes.func.isRequired, // it returns a Promise
  value: PropTypes.string
};

export default SurveyAsyncSelectable;
