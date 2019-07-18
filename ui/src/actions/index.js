import axios from "axios";
import {
  FETCH_USER,
  FETCH_EMPLOYEES,
  FETCH_LAST_EMPLOYEES,
  COUNT_EMPLOYEES,
  FETCH_EMPLOYEE,
  DELETE_EMPLOYEE
} from "./types";

//Action creator
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  //If object includes a key id, is an update
  const res = await axios.post("/api/employees", values);
  history.push("/employees");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchEmployees = offset => async dispatch => {
  console.log("offset", offset);
  const res = await axios.get("/api/employees", {
    params: {
      offset
    }
  });
  console.log("fetch response", res);
  dispatch({ type: FETCH_EMPLOYEES, payload: res.data });
};

export const countEmployees = () => async dispatch => {
  const res = await axios.get("/api/count_employees/");
  dispatch({ type: COUNT_EMPLOYEES, payload: res.data });
};

export const fetchTopEmployees = () => async dispatch => {
  const res = await axios.get("/api/top_employees/");
  dispatch({ type: FETCH_LAST_EMPLOYEES, payload: res.data });
};

export const fetchEmployee = id => async dispatch => {
  const res = await axios.get("/api/employees/" + id);
  dispatch({ type: FETCH_EMPLOYEE, payload: res.data });
};

export const deleteEmployee = id => async dispatch => {
  const res = await axios.delete(`/api/employees/${id}`);
  dispatch({ type: DELETE_EMPLOYEE, payload: { id, response: res.data } });
};
