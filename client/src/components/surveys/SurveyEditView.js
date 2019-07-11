import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { fetchEmployees, countEmployees } from '../../actions';
import Button from '@tds/core-button-link';


class SurveyList extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          offset: 0,
        };
      }

    componentDidMount() {
        this.props.fetchEmployees();
        this.props.countEmployees();
        
    }

    handlePageClick = data => {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.props.perPage);
    
        this.setState({ offset: offset }, () => {
            this.props.fetchEmployees();
        });
      };

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
                
            <div><Button href="/api/employees/csv">Export CSV</Button></div>
            <h3 align="center">Employee List</h3>

            <div>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.props.countEmployees/10}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                />
            </div>

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

function mapStateToProps({ surveys, countEmployees }) {
    console.log(surveys);
    console.log(countEmployees);
    return { surveys, countEmployees };
}

export default connect(mapStateToProps, { fetchEmployees, countEmployees })(SurveyList);