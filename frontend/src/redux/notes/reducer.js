import actions from './actions';


const colors = ['#7ED321', '#de1b1b', '#511E78', '#ff9009', '#42a5f5'];
const initState = {
    notes: [],
    colors,
    loading: false,
    selectedId: 0,
    seectedColor: ""
};

export default function noteReducer(state = initState, action) {
    switch (action.type) {
        case actions.CHANGE_NOTE:
            return {
                ...state,
                selectedId: action.selectedId,
                seectedColor: action.seectedColor
            };
        case actions.ADD_NOTE:
            return {
                ...state,
                notes: action.notes,
                selectedId: action.selectedId
            };

        case actions.ADD_NOTE_DONE:

            state.notes.map(item=>{
                if(typeof item.id ==="object"){
                    return item.id = action.payload.id;
                }
            });
            return{
              ...state,
                notes:state.notes
            };
        case actions.EDIT_NOTE:
            return {
                ...state,
                notes: action.notes
            };
        case actions.DELETE_NOTE:
            return {
                ...state,
                notes: action.notes,
                selectedId: action.selectedId
            };
        case actions.CHANGE_COLOR:
            return {
                ...state,
                notes: action.notes,
                seectedColor: action.seectedColor
            };

        case actions.GET_NOTES_REQ:
            return {
                ...state,
                loading: true
            };
        case actions.GET_NOTES_DONE:

            return {
                ...state,
                loading: false,
                notes: action.payload,
                selectedId: action.payload.length > 0 ? action.payload[0].id : 0,
                selectedColor: action.payload.length > 0 ? action.payload[0].color : "0"
            };
        default:
            return state;
    }
}
