import { createStore, combineReducers, applyMiddleware } from 'redux';
import {systemReducers,companyReducers, customerReducers, carrierReducers } from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({
        systemReducers,
        companyReducers,
        customerReducers,
        carrierReducers
    })
    // applyMiddleware(thunk)
);