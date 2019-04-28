/*
    Import form reducer using redux
*/

import * as actionTypes from '../actions/importFileActionsTypes';


const initialState = {

                       file:{
                                file_name:"",
                                records_imported:0,
                                total_records:0,   
                                record_item:{},
                                fail_record_number:0,                                                         
                                message:"",
                                error_message:""
                        }

}


const reducer = (state = initialState, actions) => {


        switch(actions.type){

            case actionTypes.UPLOAD_CSV_FILE:
            return {
                        file:{
                            ...state.file,
                            ...actions.payload                            
                        }
                        
            }    

            case actionTypes.UPDATE_CSV_FILE_PROGRESS:
            return {
                        file: {   
                            ...state.file,                        
                            ...actions.payload                            
                        }
                        
            }
            case actionTypes.CSV_FILE_ERROR:
            return {
                        file: {
                                ...state.file,
                                ...actions.payload
                        }
            }
            default:
            return state;
        }

}

export default reducer;