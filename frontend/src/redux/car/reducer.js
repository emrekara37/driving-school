import actions from "./actions";

const initState = {
    isLoading: false,
    result: false,
    data:[],
    isError: false
};

export default function carReducer(state = initState, action) {
    switch (action.type) {
        case actions.ADD_CAR_REQ:
            return {
                ...state,
                isLoading: true,
                result: false,
            };
        case actions.ADD_CAR_DONE:
            return {
                ...state,
                isLoading: false,
                result: action.payload
            };
        case actions.ADD_CAR_ERR:
            return {
                ...state,
                result: false,
                isError: true
            };
        case actions.GET_CARS_REQ:
            return {
                ...state,
                isLoading: true,
            };

        case actions.GET_CARS_DONE:
            return {
                ...state,
                isLoading: false,
                data: actions.setCarsTable(action.payload),
            };

        default:
            return state;
    }
}
