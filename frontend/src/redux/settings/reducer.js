import actions from "./actions";

const initState = {
    isLoading: false,
    data: [],
    isError: false,
    isSaveLoading:false,
    isSaveError:false
};

export default function settingsReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_SETTINGS_REQ:
            return {
                ...state,
                isLoading: true,
            };
        case actions.GET_SETTINGS_DONE:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case actions.GET_SETTINGS_ERR:
            return {
                ...state,
                isLoading: false,
                isError: true
            };

        case actions.SET_SETTINGS_REQ:
            return {
                ...state,
                isSaveLoading: true
            };
        case actions.SET_SETTINGS_DONE:
            return {
                ...state,
                data: action.payload,
                isSaveLoading:false
            };

        default:
            return state;
    }
}
