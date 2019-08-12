import { FETCH_EMPLOYEES, DELETE_EMPLOYEE, FETCH_LAST_EMPLOYEES } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return action.payload;
    case FETCH_LAST_EMPLOYEES:
        return action.payload;      
    case DELETE_EMPLOYEE:
      const index = state.findIndex(data => data._id === action.payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
}
