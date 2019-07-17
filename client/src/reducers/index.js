import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import employeesReducer from './employeesReducer';
import employeesTotalReducer from './employeesTotalReducer';
import employeeReducer from './employeeReducer';
import deleteEmployeeReducer from './deleteEmployeeReducer';

export default combineReducers({
    //Reducers are assign to keys
    auth: authReducer,
    form: reduxForm,
    employees: employeesReducer,
    totalEmployees: employeesTotalReducer,
    employee: employeeReducer,
    deleteEmployee: deleteEmployeeReducer,
});
