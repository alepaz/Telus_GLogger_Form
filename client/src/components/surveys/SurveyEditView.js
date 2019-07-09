import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchEmployees();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(employee => {
            return(
                <tr key={employee._id}>
                    <td>{employee.firstName} {employee.lastName}</td>
                    <td>{employee.site}</td>
                    <td>{employee.employeeID}</td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td>{employee.email}</td>
                    <td>
                    <button className="btn btn-primary">Edit</button>
                    </td>
                    <td>
                    <button className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    render(){
        return(
            <div>
            <h3 align="center">Employee List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Site</th>
                  <th>Employee ID</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Email</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
              {this.renderSurveys()}
              </tbody>
            </table>
          </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchEmployees })(SurveyList);