const actions = {
    GET_ROOMS_REQUEST: 'GET_ROOMS_REQUEST',
    GET_ROOMS_REQUEST_DONE: 'GET_ROOMS_REQUEST_DONE',
    GET_ROOMS_REQUEST_ERROR: 'GET_ROOMS_REQUEST_ERROR',
    getRooms: (data) => {
        return (dispatch) => {
            dispatch({
                type: actions.GET_ROOMS_REQUEST,
                payload: {data}
            });
        }
    }
};
export default actions;
