import {getCourseId} from "../../helpers/utility";
import axios from 'axios';
import {API_URL} from "../../settings";
import moment from 'moment';

const calendarActions = {
    CALENDAR_VIEW: 'CALENDAR_VIEW',
    CALENDAR_EVENTS: 'CALENDAR_EVENTS',
    GET_USERS_REQ: 'GET_USERS_REQ',
    GET_USERS_DONE: 'GET_USERS_DONE',
    GET_USERS_ERR: 'GET_USERS_ERR',
    GET_CALENDAR_REQ: 'GET_CALENDAR_REQ',
    ADD_CALENDAR_REQ: "ADD_CALENDAR_REQ",
    ADD_CALENDAR_ERR: "ADD_CALENDAR_ERR",
    ADD_CALENDAR_DONE: "ADD_CALENDAR_DONE",
    GET_CALENDAR_ERR: 'GET_CALENDAR_ERR',
    GET_CALENDAR_DONE: 'GET_CALENDAR_DONE',
    DELETE_CALENDAR_REQ: 'DELETE_CALENDAR_REQ',
    DELETE_CALENDAR_DONE: 'DELETE_CALENDAR_DONE',
    DELETE_CALENDAR_ERR: 'DELETE_CALENDAR_ERR',
    changeView: view => ({
        type: calendarActions.CALENDAR_VIEW,
        view
    }),


    changeEvents: events => ({
        type: calendarActions.CALENDAR_EVENTS,
        events
    }),
    getUsers: () => {
        return (dispatch) => {
            dispatch({
                type: calendarActions.GET_USERS_REQ,
                payload: {id: getCourseId()}
            })
        }
    },
    addCalendar: (data) => {
        data.userId = data.userIds.join(",");
        let body = {
            startDate: data.start.toString(),
            endDate: data.end.toString(),
            title: data.title,
            description: data.desc,
            userId: data.userId,
            phoneNumber:data.phoneNumber,
            courseId: getCourseId()

        };
        return (dispatch) => {
            dispatch({
                type: calendarActions.ADD_CALENDAR_REQ,
                payload: {body}
            })
        }
    },
    deleteCalendar: (id) => {
        return (dispatch) => {

            dispatch({
                type: calendarActions.DELETE_CALENDAR_REQ,
                payload: {id}
            })
        }
    },
    setEvents: (data) => {
        let events = [];
        data.map(item => {
            return events.push({
                allDay: false,
                start:  moment(item.startDate).toDate(),
                end: moment(item.endDate).toDate(),
                title: item.title,
                desc: item.description,
                userId: item.userId,
                id: item.id

            });
        });
        return events;
    },
    setDate:(date)=>{
        return {
            allDay: false,
            start:  moment(date.startDate).toDate(),
            end: moment(date.endDate).toDate(),
            title: date.title,
            desc: date.description,
            userId: date.userId,
            id: date.id
        }

    },

    getToday: async () => {
        const req = await axios.get(`${API_URL}api/app/courseCalendar/gettoday/${getCourseId()}`);
        return req.data;
    },
    getCalendar: () => {
        return (dispatch) => {
            dispatch({
                type: calendarActions.GET_CALENDAR_REQ,
                payload: {id: getCourseId()}
            })
        };
    },

};
export default calendarActions;
