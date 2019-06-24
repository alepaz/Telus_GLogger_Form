import { FETCH_USER } from '../actions/types';

//State object responsable for this object, we have to provide a value for our state
export default function(state = null, action) {
    switch  (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}