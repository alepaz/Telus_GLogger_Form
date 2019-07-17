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

    renderContent(employee) {
        let position = '';
        let department = '';
        let site = '';
        let country = '';
        let supervisor = '';
        let firstName = '';
        let secondName = '';
        let lastName = '';
        let email = '';
        let id = '';
        let workday = '';
        try{
            position = employee[0].position;
            department = employee[0].department;
            site = employee[0].site;
            country = employee[0].country;
            supervisor = employee[0].supervisorID;
            firstName = employee[0].firstName;
            secondName = employee[0].secondName;
            lastName = employee[0].lastName;
            email = employee[0].email;
            id = employee[0]._id;
            workday = employee[0].employeeID;
        }catch(err){
            
        }
        
        if(this.state.showFormReview){
            return <SurveyFormReview 
                onCancel={() => this.setState({ showFormReview: false })}
            />;
        }

        return <SurveyForm 
            initialValues={{id, workday, position, department, site, country, supervisor, firstName, secondName, lastName, email }}
            employee={employee}
            onSurveySubmit={() => this.setState({ showFormReview: true })} 
        />;
    }

    render() {
        return (
            <div>
                {/* <div>{this.props.id}</div> */}
                {this.renderContent(this.props.employee)}
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