/*

Store actions using redux thunk to update state to save in 
Redux store
*/

import * as actionTypes from '../actions/importFileActionsTypes';
import * as searchActionTypes from '../actions/searchActionTypes'
import axios from 'axios';


export const uploadCsvFileToServer = (value) => {

    return (dispatch, getState) => {

        axios.post("/import",value.file)
        .then(response => {

            //dispatch({type:ALL_TASK_ATTACHMENTS, payload:response.data});
            console.log("response is ");
            console.log(response);
            dispatch({type:actionTypes.UPLOAD_CSV_FILE,payload:response.data});

        })
        .catch((err) =>{
            
            console.log("The error thrown");
            console.log(err.response.data);
            dispatch({ type: actionTypes.CSV_FILE_ERROR, payload: err.response.data});

        })
            

    }

}


export const updateCsvFileProgress = (data) => {

    return (dispatch, getState) => {

            //real time by web socket response
            dispatch({type:actionTypes.UPDATE_CSV_FILE_PROGRESS, payload:data})
            
    }

}


export const makeQueryToTheServer = ( searchVal ) => {

    return ( dispatch, getState ) => {

        axios.post('/search',{query:searchVal})
            .then(response => {

                dispatch({type:searchActionTypes.UPDATE_SEARCH_RESULTS, payload:response.data.results})
            })

    }

}


export const thowErrorMessage = (data) => {

    return (dispatch, getState) => {

        //real time by web socket response
        dispatch({type:actionTypes.CSV_FILE_ERROR,payload:data})
        
    }    

}

