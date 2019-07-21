import { DELETE_EMPLOYEE } from '../actions/types';

export default function(state = [], action){
    switch (action.type) {
        case DELETE_EMPLOYEE:
            return action.payload;          
        default:
            return state;
    }
}