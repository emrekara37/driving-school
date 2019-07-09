import {all, takeEvery, fork, call, put} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const addCalendarReq = async (data) => (axios.post(`${API_URL}api/app/courseCalendar`, data));

export function* addCalendar() {
    yield takeEvery(actions.ADD_CALENDAR_REQ, function* ({payload}) {
        try {
            const {body} = payload;
            const response = yield call(addCalendarReq, body);
            body.id= response.data;
            yield put({
                type: actions.ADD_CALENDAR_DONE,
                payload: response.data
            });

        } catch (e) {
            yield put({
                type: actions.ADD_CALENDAR_ERR
            });
        }


    });
}

const getCalendarReq = async (id) => (axios.get(`${API_URL}api/app/courseCalendar/getlist/${id}`));

export function* getCalendar() {
    yield takeEvery(actions.GET_CALENDAR_REQ, function* ({payload}) {
       try {
            const {id} =payload;
            const response= yield call(getCalendarReq,id);
            yield put({
                type:actions.GET_CALENDAR_DONE,
                payload:response.data
            })

       }catch (e) {
           yield put({
               type:actions.GET_CALENDAR_ERR
           })

       }
    });
}
const deleteCalendarReq= async(id)=> (axios.delete(`${API_URL}api/app/courseCalendar/${id}`));
export function* deleteCalendar(){
    yield takeEvery(actions.DELETE_CALENDAR_REQ,function* ({payload}){
       try {

           const {id}= payload;
           const response= yield call(deleteCalendarReq,id);
           yield put({
               type:actions.DELETE_CALENDAR_DONE,
               payload:response.data,
           })

       } catch (e) {
           yield put({
               type:actions.DELETE_CALENDAR_ERR,
           })
       }
    });

}
export default function* rootSaga() {
    yield all([
        fork(addCalendar),
        fork(getCalendar),
        fork(deleteCalendar),
    ]);
}
