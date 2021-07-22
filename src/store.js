import { createStore, combineReducers, applyMiddleware } from 'redux';
import {systemReducers,companyReducers, adminReducers, customerReducers, carrierReducers, invoiceReducers, dispatchReducers, loadBoardReducers } from './reducers';
import thunk from 'redux-thunk';

export const store = createStore(
    combineReducers({
        systemReducers,
        companyReducers,
        adminReducers,
        customerReducers,
        carrierReducers,
        invoiceReducers,
        dispatchReducers,
        loadBoardReducers
    })
    // applyMiddleware(thunk)
);