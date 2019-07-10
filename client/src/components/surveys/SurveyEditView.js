import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../../actions';
import Button from '@tds/core-button-link';

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
                    {/*<td>{employee.department}</td>*/}
                    <td>{employee.email.replace(/telusinternational.com/, "...")}</td>
                    <td>
                    <Button>Edit</Button>
                    </td>
                    <td>
                    <Button>Delete</Button>
                    </td>
                </tr>
            );
        });
    }

    render(){
        return(
            <div>
                <a href="/api/employees/csv"><Button>Export CSV</Button></a>
            <div></div>
            <h3 align="center">Employee List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                    <tr>
                        <th>Employee ID</th>                    
                        <th>Employee</th>
                        <th>Site</th>
                        <th>Position</th>
                        {/*<th>Position</th>*/}
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