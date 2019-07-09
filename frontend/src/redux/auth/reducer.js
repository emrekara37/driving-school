import actions from "./actions";

const initState = { idToken: null ,isLoading:true,isError:false};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return {
        idToken: action.token,
        isLoading:false,
        isError:false

      };
    case actions.LOGOUT:
      return initState;
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
