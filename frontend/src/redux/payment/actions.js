const paymentAction = {
    GET_PAYMENT_REQ: 'GET_PAYMENT_REQ',
    GET_PAYMENT_DONE: 'GET_PAYMENT_DONE',
    GET_PAYMENT_ERR: 'GET_PAYMENT_ERR',
    getPayment: (userId) => {
        return (dispatch) => {
            dispatch({
                type: paymentAction.GET_PAYMENT_REQ,
                payload: userId
            })
        }
    }

};
export default paymentAction;
