import {ADD_SPONSOR_SUCCESS, ADD_SPONSOR_PENDING, ADD_SPONSOR_ERROR} from './actionTypes';
import axios from 'axios';
import {AddSponsorUrl} from '../utils/url'

export const AddSponsorSuccess = (storeSuccess) => ({
    type: ADD_SPONSOR_SUCCESS, storeSuccess
})

export const AddSponsorError = (storeError) => ({
    type: ADD_SPONSOR_ERROR, storeError
})

export const AddSponsorPending = (storePending) => ({
    type: ADD_SPONSOR_PENDING, storePending
})

export const AddSponsor = (data) => {
	return dispatch => {
        dispatch(AddSponsorPending(true));
        dispatch(AddSponsorSuccess(false));
        dispatch(AddSponsorError(null));
        axios.post(
            AddSponsorUrl, data, {responseType : 'json'}
        ).then( response => {
            let data = response.data;
            // console.log(data);
            dispatch(AddSponsorSuccess(data));
            dispatch(AddSponsorPending(false));
        }).catch( err => {
            let data = err.message;
            dispatch(AddSponsorError(data));
            dispatch(AddSponsorPending(false));
            dispatch(AddSponsorSuccess(false));
        })
    }
}