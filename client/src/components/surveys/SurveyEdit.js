//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { fetchEmployee } from '../../actions';

class SurveyEdit extends Component {
    state = { showFormReview: false };

    componentDidMount(){
        this.props.fetchEmployee();
    }

    renderContent() {
        if(this.state.showFormReview){
            return <SurveyFormReview 
                onCancel={() => this.setState({ showFormReview: false })}
            />;
        }

        return <SurveyForm 
            onSurveySubmit={() => this.setState({ showFormReview: true })} 
        />;
    }

    render() {
        console.log(this.props.id);
        return (
            <div>
                <div>{this.props.id}</div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ fetchEmployee }) {
    return { fetchEmployee };
}

export default connect(mapStateToProps)(reduxForm({
    form: 'surveyForm'
})(SurveyEdit));