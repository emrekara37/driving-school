import actions from "./actions";
const initState = {
    feature:{},
    addResult:{},
    isLoading:false,
    isAddLoading:false,
    isAddError:false,
    isError:false,
};

export default function featureReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_FEATURE_REQ:
            return {
                ...state,
                isLoading: true
            };
        case actions.GET_FEATURE_DONE:
            return {
                ...state,
                isLoading:false,
                feature:action.payload
            };
        case actions.GET_FEATURE_ERR:
            return {
                ...state,
                isLoading:false,
                isError:true
            };
        case actions.ADD_FEATURE_REQ:
            return {
                ...state,
                isAddLoading: true
            };
        default:
            return state;
    }
}
