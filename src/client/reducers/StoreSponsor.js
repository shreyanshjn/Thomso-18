import { ADD_SPONSOR_SUCCESS, ADD_SPONSOR_ERROR, ADD_SPONSOR_PENDING} from '../actions/actionTypes';
import initialState from './initialState';


const StoreSponsor = (state = initialState.StoreSponsor, action) => {
    // console.log(state);
    // console.log(action.storeSuccess);
    // console.log(action.storePending);
    // console.log(action.storeError);
    switch(action.type) {
        case ADD_SPONSOR_SUCCESS:
            return {
                ...state,
                storeSuccess: action.storeSuccess
            }
        
        case ADD_SPONSOR_PENDING: 
            return{
                ...state,
                storePending: action.storePending
            }

        case ADD_SPONSOR_ERROR:
            return{
                ...state,
                storeError: action.storeError
            }

        default:
            return state;
    }
}

export default StoreSponsor;