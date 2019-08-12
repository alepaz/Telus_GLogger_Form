import { FETCH_EMPLOYEE } from '../actions/types';

export default function(state = [], action){
    switch (action.type) {
        case FETCH_EMPLOYEE:
            return action.payload;          
        default:
            return state;
    }
}