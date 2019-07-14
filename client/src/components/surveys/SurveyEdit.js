//SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetchEmployee } from '../../actions';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyEdit extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            id: '',
            showFormReview: false,
            employee: {}
        };
    }

    componentDidMount(){
        const id = this.props.id;
        this.setState({ }, () => {
            this.props.fetchEmployee(id);
        });
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
        
        console.log(this.props.employee);
        return (
            <div>
                <div>{this.props.id}</div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ employee }) {
    return { employee };
}

export default connect(mapStateToProps, { fetchEmployee })(reduxForm({
    form: 'surveyForm'
})(SurveyEdit));