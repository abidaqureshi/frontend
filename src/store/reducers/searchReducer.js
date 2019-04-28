import * as actionTypes from '../actions/searchActionTypes';

const initalState = {

                        results:[], 
                        item:{}

}

const reducer = (state = initalState, action ) => {


        switch(action.type) {

            case actionTypes.UPDATE_SEARCH_RESULTS:
            return {
                        ...state,
                        results:[
                                    ...action.payload
                        ]
            }    
            case actionTypes.SHOW_ITEM_DETAILS:
            return {

                        ...state,
                        item:{
                                ...action.payload
                        }
            }
            default:
            return state;    
        }
}

export default reducer;