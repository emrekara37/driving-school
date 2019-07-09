import actions from "./actions";

const events = [];
const initState = {
    events,
    calendarLoading: false,
    addCalendarLoding:false,
    addCalendarErr:false,
    calendarError: false,
    deleteCalendarLoading:false,
    deleteCalendarErr:false,
    view: "month"
};

export default function calendsrReducer(state = initState, action) {
    switch (action.type) {
        case actions.CALENDAR_VIEW:
            return {
                ...state,
                view: action.view
            };
        case actions.CALENDAR_EVENTS:
            return {
                ...state,
                events: action.events
            };
        case actions.ADD_CALENDAR_REQ:
            return {
                ...state,
                addCalendarLoading: true,
            };
        case actions.ADD_CALENDAR_ERR:
            return {
                ...state,
                addCalendarErr: true
            };
        case actions.ADD_CALENDAR_DONE:
            state.events.push(actions.setDate(action.payload));
            return {
                ...state,
                addCalendarLoading: false
            };
        case actions.GET_CALENDAR_REQ:
            return {
                ...state,
                calendarLoading: true,
            };
        case actions.GET_CALENDAR_DONE:
            return {
                ...state,
                calendarLoading: false,
                events: actions.setEvents(action.payload)
            };
        case actions.DELETE_CALENDAR_REQ:
            return {
              ...state,
              deleteCalendarLoading: true,
            };
        case actions.DELETE_CALENDAR_DONE:
            return{
                ...state,
                deleteCalendarLoading:false,
            };
        case actions.DELETE_CALENDAR_ERR:
            return{
                ...state,
                deleteCalendarErr: true,
                deleteCalendarLoading:false
            }
        default:
            return state;
    }
}
