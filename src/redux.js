import {createStore, combineReducers} from 'redux';

// REDUCER
export const inputFieldValue = (state='', action) => {
    switch(action.type) {
        case 'UPDATE_INPUT_VALUE':
            return action.payload;
        default:
            return state;
    }
};

    // ACTIONS
    export const updateInputValue = val => { return {
        type: 'UPDATE_INPUT_VALUE',
        payload: val,
    }};


// REDUCER
export const redditData = (state=[], action) => {
    switch(action.type) {
        case 'UPDATE_REDDIT_DATA':
            return action.payload;
        default:
            return state;
    }
};

    // ACTIONS
    export const updateRedditData = val => { return {
        type: 'UPDATE_REDDIT_DATA',
        payload: val,
    }};


// REDUCER
export const displayData = (state=[], action) => {
    switch(action.type) {
        case 'UPDATE_DISPLAY':
            return action.payload;
        default:
            return state;
    }
};

    // ACTIONS
    export const updateDisplayData = val => { return {
        type: 'UPDATE_DISPLAY',
        payload: val,
    }};



// combining reducers and exporting
const allReducers = combineReducers({
    inputFieldValue,
    redditData,
    displayData,
});

export const store = createStore(allReducers);
