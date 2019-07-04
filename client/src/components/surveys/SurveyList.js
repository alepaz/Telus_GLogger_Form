import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return(
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content text-white">
                        <span className="card-title">{survey.firstName} {survey.secondName} {survey.lastName}</span>
                        <div class="card-content">
                            <p> <b style={{fontWeight: "bold"}}>Site: </b>
                                {survey.site}
                            </p>
                            <p> <b style={{fontWeight: "bold"}}>Supervisor: </b>
                                {survey.supervisorID}
                            </p>                            
                            <p> <b style={{fontWeight: "bold"}}>Temporal ID: </b>
                                {survey.employeeID}
                            </p>
                            <p> <b style={{fontWeight: "bold"}}>Position: </b>
                                {survey.position}
                            </p>
                            <p> <b style={{fontWeight: "bold"}}>Department: </b>
                                {survey.department}
                            </p>
                            <p> <b style={{fontWeight: "bold"}}>Email: </b>
                                {survey.email}
                            </p>                            
                        </div>
                    </div>
                </div>
            );
        });
    }

    render(){
        return(
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);