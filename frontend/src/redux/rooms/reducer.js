import actions from "./actions";

const initState = { isLoading:true,data:{},isError:false};

export default function roomReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_ROOMS_REQUEST:
            return {
                ...initState,
                isLoading:true,
            };
        case actions.GET_ROOMS_REQUEST_DONE:
            return {
                data:action.payload,
                isLoading:false
            };
        case actions.GET_ROOMS_REQUEST_ERROR:
            return{
                ...initState,
                isLoading:false,
                isError:true,
            };
        default:
            return state;
    }
}
