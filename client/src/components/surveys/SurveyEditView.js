import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import { fetchEmployees, countEmployees, deleteEmployee } from "../../actions";
import Button from "@tds/core-button-link";
import { colorAccessibleGreen, colorTelusPurple } from "@tds/core-colours";

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
    this.props.fetchEmployees();
    this.props.countEmployees();
  }

  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset }, () => {
      this.props.fetchEmployees(offset);
    });
  };

  handleDeleteEmployee = id => {
    const { offset } = this.state;
    this.props.deleteEmployee(id);
    this.props.fetchEmployees(offset);
  };

  renderSurveys() {
    return this.props.employees.reverse().map(employee => {
      return (
        <tr key={employee._id}>
          <td>
            {employee.firstName} {employee.lastName}
          </td>
          <td>{employee.site}</td>
          <td>{employee.employeeID}</td>
          <td>{employee.position}</td>
          {/*<td>{employee.department}</td>*/}
          <td>{employee.email.replace(/telusinternational.com/, "...")}</td>
          <td>
            <Button
              variant="secondary"
              href={"/employees/edit/" + employee._id}
            >
              Edit
            </Button>
          </td>
          <td>
            {/* <button onClick={this.handleDeleteEmployee} className="btn btn-danger">Delete</button> */}
            <Button
              onClick={() => this.handleDeleteEmployee(employee._id)}
              variant="secondary"
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          <Button href="/api/csv_employees/">Export CSV</Button>
        </div>
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
            activeClassName={"active"}
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
