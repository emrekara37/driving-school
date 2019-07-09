import actions from "./actions";

const initState = {
    userCount:0,
    loadingUser:false,
    errorUser:false,
    loadingVc:false,
    events:[],
    vc:0,
};

export default function dashReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_USER_COUNT_REQUEST:
            return {
                ...initState,
                loadingUser:true,
            };
        case actions.GET_USER_COUNT_DONE:
            return {
                ...initState,
                userCount:action.payload,
                loadingUser:false,
            };
        case actions.GET_USER_COUNT_ERR:
            return{
                ...initState,
                loadingUser:false,
                errorUser:true,
            };
        case actions.GET_VIEW_COUNT_REQUEST:
            return {
                ...initState,
                loadingVc:true,
            };
        case actions.GET_VIEW_COUNT_DONE:
            return {
                ...initState,
                vc:action.payload,
                loadingVc:false,
            };
        case actions.GET_VIEW_COUNT_ERR:
            return{
                ...initState,
                loadingVc:false,
            };
        case actions.GET_TODAY_CAL_REQ:
            return {
                ...initState,
            };
        case actions.GET_TODAY_CAL_DONE:
            return{
                ...initState,
                events:action.payload
            };
        default:
            return state;
    }
}
