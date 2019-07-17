import { FETCH_SURVEYS, DELETE_EMPLOYEE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    case DELETE_EMPLOYEE:
      const index = state.findIndex(data => data._id === action.payload.id);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
}
