//SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
//Redux form has access to the redux store
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SurveyField from "./SurveyField";
import SurveySelect from "./SurveySelect";
import { fetchEmployee } from "../../actions";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
import SurveyAsyncSelectable from "./SurveyAsyncSelectable";
import employeeService from "../../services/employeeService";

const email = value =>
  value && !/^[A-Z0-9._%+-]+@telusinternational.com$/i.test(value)
    ? "Invalid email address, must be @telusinternational.com"
    : undefined;

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      employee: {}
    };
  }

  componentDidMount() {
  }

  renderFields(employee) {
    return (
      <>
        {" "}
        <Field
          name="id"
          type="hidden"
          style={{ height: 0 }}
          component="input"
        />
        <Field
          name="workday"
          type="hidden"
          style={{ height: 0 }}
          component="input"
        />
        <Field
          name="department"
          component={SurveySelect}
          className="browser-default"
        >
          <option value="" disabled defaultValue>
            Select a Department:
          </option>
          <option value="TELUS Business Solutions">
            TELUS Business Solutions
          </option>
        </Field>
        <Field
          key="position"
          component={SurveyField}
          type="text"
          label="Employee Position"
          name="position"
        />
        <Field name="site" component={SurveySelect} className="browser-default">
          <option value="" disabled defaultValue>
            Select a Site:
          </option>
          <option value="India Temporal">India Temporal</option>
        </Field>
        <Field
          name="country"
          component={SurveySelect}
          className="browser-default"
        >
          <option value="" disabled defaultValue>
            Select a Country:
          </option>
          <option value="India">India</option>
        </Field>
        {/* <Field
          name="supervisor"
          component={SurveySelect}
          className="browser-default"
        >
          <option value="" disabled defaultValue>
            Select a Supervisor (Optional):
          </option>
          <option value="Supervisor 1">Supervisor 1</option>
          <option value="Supervisor 2">Supervisor 2</option>
        </Field> */}
        <Field
          label="Supervisor"
          name="supervisor"
          component={SurveyAsyncSelectable}
          className="browser-default"
          service={employeeService.getEmployees}
          mapping={e => ({
            value: e.employeeID,
            label: `${e.firstName} ${e.secondName} ${e.lastName}`
          })}
        />
        <Field
          key="firstName"
          component={SurveyField}
          type="text"
          label="Employee First Name"
          name="firstName"
        />
        <Field
          key="secondName"
          component={SurveyField}
          type="text"
          label="Employee Second Name"
          name="secondName"
        />
        <Field
          key="lastName"
          component={SurveyField}
          type="text"
          label="Employee Last Name"
          name="lastName"
        />
        <Field
          key="email"
          component={SurveyField}
          type="email"
          label="Work Email"
          name="email"
          validate={email}
        />
      </>
    );
  }

  render() {
    const employee = this.props.employee[0] ? this.props.employee[0] : false;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields(employee)}
          <Link to="/employees" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  //Iterate to validate all fields on the FIELDS array
  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps({ employee }) {
  return { employee };
}

// export default connect(state => ({
//     initialValues: {
//       position: 'some value here'
//     }
//   }))(reduxForm({
//     validate,
//     form: 'surveyForm',
//     destroyOnUnmount: false
// })(SurveyForm));

// const mapStateToProps = (state, props) => ({
//     //initialValues: state.employee.position, // retrieve name from redux store
//     initialValues: {
//         position: "test",
//     } , // retrieve name from redux store
//   })

export default connect(
  mapStateToProps,
  { fetchEmployee }
)(
  reduxForm({
    validate,
    form: "surveyForm",
    destroyOnUnmount: false,
    enableReinitialize: true
  })(SurveyForm)
);
