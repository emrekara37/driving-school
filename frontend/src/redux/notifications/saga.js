import {all, takeEvery, fork, call, put} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const getNotificationsReq = async (id) => (axios.get(`${API_URL}api/app/notification/unreads/${id}`));

export function* getNotifications() {
    yield takeEvery(actions.GET_NOTIFICATION_REQ, function* ({payload}) {
        try {
            const {id} = payload;
            const response = yield call(getNotificationsReq, id);
            yield put({
                type: actions.GET_NOTIFICATION_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_NOTIFICATION_ERR
            })
        }
    });
}

const getAllNotificationsReq = async (id) => (axios.get(`${API_URL}api/app/notification/list/${id}`));
const readReq = async (id) => (axios.get(`${API_URL}api/app/notification/read/${id}`));

export function* read() {
    yield takeEvery(actions.READ_NOTIFICATION_REQ, function* ({payload}) {
        try {
            const {id} = payload;
            const response = yield call(readReq, id);
            yield put({
                type: actions.READ_NOTIFICATION_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.READ_NOTIFICATION_ERR
            })
        }
    });
}

export function* list() {
    yield takeEvery(actions.GET_ALL_NOTIFICATION_REQ, function* ({payload}) {
        try {
            const {id} = payload;
            const response = yield call(getAllNotificationsReq, id);
            yield put({
                type: actions.GET_ALL_NOTIFICATION_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_ALL_NOTIFICATION_ERR
            })
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getNotifications),
        fork(read),
        fork(list),
    ]);
}
