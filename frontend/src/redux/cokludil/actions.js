const actions = {
    GET_LANGUAGE_REQUEST: 'GET_LANGUAGE_REQUEST',
    GET_LANGUAGE_DONE: 'GET_LANGUAGE_DONE',
    GET_LANGUAGE_ERROR: 'GET_LANGUAGE_ERROR',
    getLang: (data) => {
        return (dispatch, getState) => {
            dispatch({
                type: actions.GET_LANGUAGE_REQUEST,
                payload: {data}
            });
        }
    }
};
export default actions;
