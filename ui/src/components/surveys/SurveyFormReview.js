// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFiels from './formFields';
import { withRouter } from 'react-router-dom';
import Button from "@tds/core-button";
import Heading from '@tds/core-heading'
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFiels, ({ name, label }) => {
        if(formValues[name]){
            return (
                <div key={name} className="row">
                    <label className="input-field col s6">
                        <Heading level="h4" tag="h3">
                            {label}
                        </Heading>
                    </label>
                    <div className="input-field col s6">{formValues[name]}</div>
                </div>
            );
        }
    });

    return (
        <div style={{paddingTop:5}}>
            <Heading level="h2" tag="h3">
                Please confirm your entries
            </Heading>            
            <h5> </h5>
            {reviewFields}
            <div className="row">
            <div className="input-field col s6">
                <Button onClick={onCancel} variant="secondary">
                  Cancel
                </Button>
            </div>
            <div className="input-field col s6 right-align">
              <Button 
              onClick={() => submitSurvey(formValues, history)}
              >
                Save Data
                <i className="material-icons right">email</i>
              </Button>
            </div>
          </div>
        </div>
    );
};

//Takes redux state and transforms into some props to send down to the component
function mapStateToProps(state){
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));