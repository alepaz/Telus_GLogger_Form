import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, COUNT_EMPLOYEES } from './types';

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

export const fetchEmployees = () => async dispatch => {
    const res = await axios.get('/api/employees');
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