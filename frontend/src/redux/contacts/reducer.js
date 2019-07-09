import contactActions from "./actions";

const initState = {
    seectedId: "",
    editView: false,
    usersLoading: false,
    users: [],
    isError: false,
    addStudentLoading: false,
    addStudentError: false,
};

export default function contactReducer(state = initState, action) {
    switch (action.type) {
        case contactActions.CHANGE_CONTACT:
            return {
                ...state,
                seectedId: action.id,
                editView: false
            };
        case contactActions.ADD_CONTACT_REQ:
            return {
                ...state,
                seectedId: action.selectedId,
                addStudentLoading: true,
            };
        case contactActions.ADD_CONTACT_DONE:
            return {
                ...state,
                users: state.users,
                addStudentLoading: false,
                seectedId: action.selectedId,
            };
        case contactActions.EDIT_CONTACT:
            return {
                ...state,
                contacts: action.contacts
            };
        case contactActions.DELETE__CONTACT:
            return {
                ...state,
                users: action.users,
                seectedId: action.seectedId
            };
        case contactActions.EDIT_VIEW:
            return {
                ...state,
                editView: action.view
            };

        case contactActions.GET_USERS_REQUEST:
            return {
                ...state,
                usersLoading: true
            };
        case contactActions.GET_USERS_DONE:
            return {
                ...state,
                users: action.payload,
                seectedId: action.payload[0].id,
                usersLoading: false
            };
        case contactActions.GET_USERS_ERROR:
            return {
                ...state,
                isError: true
            };
        default:
            return state;
    }
}
