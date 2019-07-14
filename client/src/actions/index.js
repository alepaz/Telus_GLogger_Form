import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, COUNT_EMPLOYEES, FETCH_EMPLOYEE } from './types';

//Action creator
export const fetchUser = () =>  async (dispatch) => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/employees', values);
    history.push('/employees');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchEmployees = (offset) => async dispatch => {
    console.log(offset);
    const res = await axios.get('/api/employees', {
        params: {
            offset
        }
      });
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const countEmployees = () => async dispatch => {
    const res = await axios.get('/api/employees/count');
    dispatch({ type: COUNT_EMPLOYEES, payload: res.data });
};

export const fetchTopEmployees = () => async dispatch => {
    const res = await axios.get('/api/employees/top');
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchEmployee = (id) => async dispatch => {
    const res = await axios.get('/api/employees/'+id);
    dispatch({ type: FETCH_EMPLOYEE, payload: res.data });
};