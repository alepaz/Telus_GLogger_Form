import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import Axios from 'axios';
import Swal from 'sweetalert2';
import Button from "@tds/core-button-link";
import Heading from '@tds/core-heading';
import { colorTelusPurple } from "@tds/core-colours";
import { fetchEmployees, countEmployees, deleteEmployee } from "../../actions";
import '../../css/styles.css'; // Import regular stylesheet

class SurveyList extends Component {
  static propTypes = {
    perPage: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      offset: 0
    };
  }

  componentDidMount() {
    this.props.countEmployees();
    this.props.fetchEmployees();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.props.fetchEmployees(offset);
    });
  };

  handleDeleteEmployee = async (id) => {
    // const { offset } = this.state;
    
      const response = await Axios.get(`/api/is_supervisor/${id}`);

      if(response.data.length){
        Swal.fire({
          type: 'error',
          title: 'Supervisor',
          text: 'This employee has a relation as a supervisor with another employee.',
        })
      }else{
        this.props.deleteEmployee(id);
        Swal.fire({
          type: 'success',
          title: 'The employee has been removed',
          showConfirmButton: false
        })
      }
    // this.props.fetchEmployees(offset);
  };

  renderSurveys() {
    return this.props.employees.reverse().map(employee => {
      return (
        <tr key={employee._id}>
          <td>{employee.employeeID}</td>
          <td>
            {employee.firstName} {employee.lastName}
          </td>
          <td>{employee.site}</td>
          <td>{employee.position}</td>
          {/*<td>{employee.department}</td>*/}
          <td>{employee.email.replace(/telusinternational.com/, "...")}</td>
          <td>
          <a className="waves-effect waves-light btn" 
              href={"/employees/edit/" + employee._id}
              style={{backgroundColor:colorTelusPurple}}>Edit</a>
            {/* <Button
              variant="secondary"
              href={"/employees/edit/" + employee._id}
            >
              Edit
            </Button> */}
          </td>
          <td>
            <button onClick={() => this.handleDeleteEmployee(employee._id)} 
                    className="btn btn-danger"
                    style={{backgroundColor:colorTelusPurple}}>Delete</button>
            {/* <Button
              onClick={() => this.handleDeleteEmployee(employee._id)}
              variant="secondary"
            >
              Delete
            </Button> */}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <div className="row">
          <div className="col s2">
            <Button href="/employees/new/" className="right-align">
              Add Employee
            </Button>
          </div>
          <div className="col s2 offset-s1">
            <Button href="/api/csv_employees/">Export CSV</Button>
          </div>
        </div>
        <Heading level="h2" tag="h3">
          Employees List.
        </Heading>

        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>
                <Heading level="h4" tag="h3">
                  Employee ID
                </Heading>
              </th>
              <th>
                <Heading level="h4" tag="h3">
                  Employee Name
                </Heading>
              </th>
              <th>
                <Heading level="h4" tag="h3">
                  Site
                </Heading>                
              </th>
              <th>
                <Heading level="h4" tag="h3">
                  Position
                </Heading>                 
              </th>
              {/*<th>Position</th>*/}
              <th>
                <Heading level="h4" tag="h3">
                  Email
                </Heading>
              </th>
              <th colSpan="2">
              <Heading level="h4" tag="h3">
                  Action
                </Heading>
              </th>
            </tr>
          </thead>
          <tbody>{this.renderSurveys()}</tbody>
        </table>
        <div>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.props.totalEmployees / 10}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"telusPurpleCSS"}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  employees: state.employees,
  totalEmployees: state.totalEmployees
});

const mapDispatchToProps = dispatch => ({
  countEmployees: () => dispatch(countEmployees()),
  deleteEmployee: id => dispatch(deleteEmployee(id)),
  fetchEmployees: offset => dispatch(fetchEmployees(offset))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyList);
