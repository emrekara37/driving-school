import notificationActions from "./actions";

const initState = {
    loading: false,
    error: false,
    notifications: [],
    unreads:[]
};

export default function notificationReducer(state = initState, action) {
    switch (action.type) {

        case notificationActions.GET_NOTIFICATION_REQ:
            return {
                ...state,
                loading: true
            };
        case notificationActions.GET_NOTIFICATION_DONE:
            return {
                ...state,
                loading: false,
                unreads: action.payload
            };
        case notificationActions.GET_NOTIFICATION_ERR:
            return {
                ...state,
                loading: false,
                error: true
            };

        case notificationActions.READ_NOTIFICATION_DONE:
            let nt = [];
            state.notifications.forEach(not => {
                if (action.payload.id !== not.id) {
                    nt.push(not);
                }
            });
            return {
                ...state,
                unreads: nt
            };
        case notificationActions.GET_ALL_NOTIFICATION_REQ:
            return {
                ...state,
                loading: true
            };
        case notificationActions.GET_ALL_NOTIFICATION_DONE:
            return {
                ...state,
                loading: false,
                notifications: action.payload
            }
        default:
            return state;
    }
}
