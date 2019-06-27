//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
//Redux form has access to the redux store
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';
import Select from '@tds/core-select'

class SurveyForm extends Component {

    //helperFunctions
    renderFields() {


        return (<> 
                    <Field key="department" component={SurveyField} type="text" label="Department Title" name="Department" />
                    <Field key="position" component={SurveyField} type="text" label="Position Title" name="position" />
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