import {getCourseId} from "../../helpers/utility";

const notificationActions = {
    GET_NOTIFICATION_REQ: "GET_NOTIFICATION_REQ",
    GET_NOTIFICATION_DONE: "GET_NOTIFICATION_DONE",
    GET_NOTIFICATION_ERR: "GET_NOTIFICATION_ERR",
    GET_ALL_NOTIFICATION_REQ: "GET_ALL_NOTIFICATION_REQ",
    GET_ALL_NOTIFICATION_ERR: "GET_ALL_NOTIFICATION_ERR",
    GET_ALL_NOTIFICATION_DONE: "GET_ALL_NOTIFICATION_DONE",
    READ_NOTIFICATION_REQ: "READ_NOTIFICATION_REQ",
    READ_NOTIFICATION_DONE: "READ_NOTIFICATION_DONE",
    READ_NOTIFICATION_ERR: "READ_NOTIFICATION_ERR",
    getUnreads: () => {
        return (dispatch) => {
            dispatch({
                type: notificationActions.GET_NOTIFICATION_REQ,
                payload: {id: getCourseId()}
            })
        }
    },
    read: (id) => {
        return (dispatch, getState) => {
            console.log(getState());
            dispatch({
                type: notificationActions.READ_NOTIFICATION_REQ,
                payload: {id},

            })
        };
    },
    list: () => {
        return (dispatch) => {
            dispatch({
                type: notificationActions.GET_ALL_NOTIFICATION_REQ,
                payload: {id: getCourseId()}
            })
        }
    }
};
export default notificationActions;
