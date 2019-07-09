import actions from './actions';

const initState = {
    payment: null,
    loading: false,
    error: true
};

export default function paymentReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_PAYMENT_REQ:
            return {
                ...state,
                loading: true
            };
        case actions.GET_PAYMENT_DONE:
            return {
                ...state,
                loading: false,
                payment: action.payload
            };
        case actions.GET_PAYMENT_ERR:
            return {
                ...state,
                loading: false,
                error: true,

            };

        default:
            return state;
    }
}
