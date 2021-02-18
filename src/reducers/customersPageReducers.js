import { customerPageConstants } from './../constants';

export const customersPageReducers = (state = {
    customers: [],
    selectedCustomer: null
}, action) => {
    switch (action.type) {
        case customerPageConstants.SET_CUSTOMERS:
            state = {
                ...state,
                customers: action.payload
            }
            break;
        case customerPageConstants.SET_SELECTED_CUSTOMER:
            state = {
                ...state,
                selectedCustomer: action.payload
            }
            break;
        default:
            break;
    }
    return state;
}