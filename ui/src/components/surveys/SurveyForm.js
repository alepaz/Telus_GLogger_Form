//SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
//Redux form has access to the redux store
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import Button from "@tds/core-button";
import SurveyField from "./SurveyField";
import SurveySelect from "./SurveySelect";
import { fetchEmployee } from "../../actions";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
import SurveyAsyncSelectable from "./SurveyAsyncSelectable";
import employeeService from "../../services/employeeService";
import asyncValidate from './asyncValidate';

const email = value =>
  value && !/^[A-Z0-9._%+-]+@telusinternational.com$/i.test(value)
    ? "Invalid email address, must be @telusinternational.com"
    : undefined;

const namesFormat = value =>
  value && !/^[A-Z]+$/i.test(value) ? "Invalid name format" : undefined;


class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      employee: {}
    };
  }

  componentDidMount() {}

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
        <div className="row">
          <div className="input-field col s6">
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
          </div>
          <div className="input-field col s6">
            <Field
              key="position"
              component={SurveyField}
              type="text"
              label="Employee Position"
              name="position"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
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
          </div>
          <div className="input-field col s6">
            <Field
              name="site"
              component={SurveySelect}
              className="browser-default"
            >
              <option value="" disabled defaultValue>
                Select a Site:
              </option>
              <option value="India Temporal">India Temporal</option>
            </Field>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <Field
              label="Supervisor *optional"
              name="supervisor"
              component={SurveyAsyncSelectable}
              className="browser-default"
              service={employeeService.getEmployees}
              mapping={e => ({
                value: e.employeeID,
                label: `${e.firstName} ${e.secondName} ${e.lastName}`
              })}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <Field
              key="firstName"
              component={SurveyField}
              type="text"
              label="Employee First Name"
              name="firstName"
              validate={namesFormat}
            />
          </div>
          <div className="input-field col s6">
            <Field
              key="secondName"
              component={SurveyField}
              type="text"
              label="Employee Second Name"
              name="secondName"
              validate={namesFormat}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <Field
              key="lastName"
              component={SurveyField}
              type="text"
              label="Employee Last Name"
              name="lastName"
              validate={namesFormat}
            />
          </div>
          <div className="input-field col s6">
            <Field
              key="email"
              component={SurveyField}
              type="email"
              label="Work Email"
              name="email"
              validate={email}
            />
          </div>
        </div>
      </>
    );
  }

  render() {
    const employee = this.props.employee[0] ? this.props.employee[0] : false;
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
          className="row"
        >
          {this.renderFields(employee)}
          <div className="row">
            <div className="input-field col s6">
              <a href="/employees">
                <Button href="/employees" variant="secondary">
                  Cancel
                </Button>
              </a>
            </div>
            <div className="input-field col s6 right-align">
              <Button type="submit">
                Next<i className="material-icons right">done</i>
              </Button>
            </div>
          </div>
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

  // if(values.id){
  //   //If employee has an ID, he is registered 
  //   console.log("Employee ID", values['id']);
  //   const employee = await Axios.get(`/api/employees/${values['id']}`);
  //   //If employee email is different we must validate
  //   console.log("Employee data:", employee.data);
  //   if(employee.data.length){
  //     if(employee.data[0].email.trim().toLowerCase() === values['email'].trim().toLowerCase() ){
  //       console.log("Same email not worry");
  //     }else{
  //       //Lets verify if email is available
  //       const email = await Axios.get(`/api/employees?email=${values['email']}`);
  //       console.log("repeated email:", email);
  //       if(email.length){
  //         console.log("I've entered");
  //         //Another person has this email
  //         errors['email'] = "Email alredy register for other user";
  //       }
  //     }
  //     console.log("Employee email:", employee.data[0].email);
  //   }
  // }
  
  // console.log("EMAIL -------",email);

  return errors;
}

function mapStateToProps({ employee }) {
  return { employee };
}

export default connect(
  mapStateToProps,
  { fetchEmployee }
)(
  reduxForm({
    validate,
    asyncValidate,
    form: "surveyForm",
    asyncBlurFields: ['email'],
    destroyOnUnmount: false,
    enableReinitialize: true
  })(SurveyForm)
);
