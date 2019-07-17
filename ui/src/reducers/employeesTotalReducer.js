import { COUNT_EMPLOYEES } from '../actions/types';

export default function(state = [], action){
    switch (action.type) {
        case COUNT_EMPLOYEES:
            return action.payload;            
        default:
            return state;
    }
}