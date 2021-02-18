import { createStore, combineReducers, applyMiddleware } from 'redux';
import {systemReducers,companyScreenReducers, customersPageReducers } from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({
        systemReducers,
        companyScreenReducers,
        customersPageReducers
    }),
    applyMiddleware(thunk)
);