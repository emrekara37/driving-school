import actions from "./actions";

const initState = { isLoading:true,data:{},isError:false};

export default function cokluDilReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_LANGUAGE_REQUEST:
            return {
                ...initState,
                isLoading:true,
            };
        case actions.GET_LANGUAGE_DONE:
            return {
                data:action.payload,
                isLoading:false
            };
        case actions.LOGIN_ERROR:
            return{
                ...initState,
                isLoading:false,
                isError:true,
            };
        default:
            return state;
    }
}
