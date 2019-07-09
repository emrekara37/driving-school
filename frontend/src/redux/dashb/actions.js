import {getCourseId} from '../../helpers/utility'

const actions = {
    GET_USER_COUNT_REQUEST: 'GET_USER_COUNT_REQUEST',
    GET_USER_COUNT_DONE: 'GET_USER_COUNT_DONE',
    GET_USER_COUNT_ERR: 'GET_USER_COUNT_ERR',
    GET_VIEW_COUNT_REQUEST: 'GET_VIEW_COUNT_REQUEST',
    GET_VIEW_COUNT_DONE: 'GET_VIEW_COUNT_DONE',
    GET_VIEW_COUNT_ERR: 'GET_VIEW_COUNT_ERR',
    GET_TODAY_CAL_REQ:"GET_TODAY_CAL_REQ",
    GET_TODAY_CAL_DONE:"GET_TODAY_CAL_DONE",
    getUserCount: () => {
        return (dispatch) => {
            dispatch({
                type: actions.GET_USER_COUNT_REQUEST,
                payload: {data: getCourseId()}
            });
        }
    },
    getViewCount: () => {
        return (dispatch) => {
            dispatch({
                type: actions.GET_VIEW_COUNT_REQUEST,
                payload: {id: getCourseId()}
            });
        }
    },
    getTodayCalendars: () => {
        return (dispatch) => {
            dispatch({
                type: actions.GET_TODAY_CAL_REQ,
                payload: {id: getCourseId()}
            });
        }
    }
};
export default actions;
