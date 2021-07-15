import * as ActionTypes from './ActionTypes';


export const Dishes = (state = { isLoading: true,
    errMsg: null,
    dishes:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMsg: null, dishes: action.payload};

        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMsg: null, dishes: []}

        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMsg: action.payload};

        default:
            return state;
    }
};