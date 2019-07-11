import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';
import employeesTotalReducer from './employeesTotalReducer';

export default combineReducers({
    //Reducers are assign to keys
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    totalEmployees: employeesTotalReducer
});
