//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
//Redux form has access to the redux store
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import SurveySelect from './SurveySelect';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import Select from '@tds/core-select';
import Tooltip from '@tds/core-tooltip';


class SurveyForm extends Component {
    renderFields() {
        return (<>  
                    <Field name="department" component={SurveySelect} className="browser-default" >
                        <option value="" disabled defaultValue>Select a Department:</option>
                        <option value="TELUS Business Solutions">TELUS Business Solutions</option>
                    </Field>
                    <Field key="position" component={SurveyField} type="text" label="Employee Position" name="position" />
                    <Field name="site" component={SurveySelect} className="browser-default">
                        <option value="" disabled defaultValue>Select a Site:</option>
                        <option value="India Temporal">India Temporal</option>
                    </Field>
                    <Field name="country" component={SurveySelect} className="browser-default">
                        <option value="" disabled defaultValue>Select a Country:</option>
                        <option value="India">India</option>
                    </Field>
                    <Field name="supervisor" component={SurveySelect} className="browser-default">
                        <option value="" disabled defaultValue>Select a Supervisor (Optional):</option>
                        <option value="Supervisor 1">Supervisor 1</option>
                        <option value="Supervisor 2">Supervisor 2</option>
                    </Field>
                    <Field key="firstName" component={SurveyField} type="text" label="Employee First Name" name="firstName" />
                    <Field key="secondName" component={SurveyField} type="text" label="Employee Second Name" name="secondName" />
                    <Field key="lastName" component={SurveyField} type="text" label="Employee Last Name" name="lastName" />
                    <Field key="email" component={SurveyField} type="email" label="Work Email" name="email" />
                </>);
                }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
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

    errors.recipients = validateEmails(values.recipients || '');
    
    //Iterate to validate all fields on the FIELDS array
    _.each(formFields, ({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);