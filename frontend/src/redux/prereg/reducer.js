import preRegActions from "./actions";

const initState = {
    loading: false,
    error: false,
    preregs: [],
    changeDone: {},
    changeLoading: false,
};

export default function preRegReducer(state = initState, action) {
    switch (action.type) {
        case preRegActions.GET_PREREG_REQ:
            return {
                ...state,
                loading: true
            };
        case preRegActions.GET_PREREG_DONE:
            return {
                ...state,
                loading: false,
                preregs: action.payload
            };
        case preRegActions.GET_PREREG_ERR:
            return {
                ...state,
                loading: false,
                error: true
            };
        case preRegActions.CHANGE_PREREG_REQ:
            return {
                ...state,
                changeLoading: true,
            };
        case preRegActions.CHANGE_PREREG_DONE:
            return {
                ...state,
                changeLoading: false,
                changeDone: action.payload
            };
        case preRegActions.CHANGE_PREREG_ERR:
            return {
                ...state,
                changeLoading:false,
            };
        default:
            return state;
    }
}
