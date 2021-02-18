import {customerPageConstants} from './../constants';
import axios from 'axios';

export const setCustomers = customers => {
    return {
        type: customerPageConstants.SET_CUSTOMERS,
        payload: customers
    }
}

export const setSelectedCustomer = customer => {
    return {
        type: customerPageConstants.SET_SELECTED_CUSTOMER,
        payload: customer
    }
}