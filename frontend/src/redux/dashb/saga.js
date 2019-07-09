import {all, takeEvery, put, call, fork} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const getUserCountReq = async (data) => (axios.get(`${API_URL}api/app/clientUser/courseUserCount/${data}`));

export function* getUserCount() {
    yield takeEvery(actions.GET_USER_COUNT_REQUEST, function* ({payload}) {
        try {
            const {data} = payload;
            const response = yield call(getUserCountReq, data);
            yield put({
                type: actions.GET_USER_COUNT_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_USER_COUNT_ERR
            })
        }
    });

}

const getVcReq = async (id) => (axios.get(`${API_URL}api/app/course/viewCount/${id}`));

export function* getVc() {
    yield takeEvery(actions.GET_VIEW_COUNT_REQUEST, function* ({payload}) {
        try {
            const {id} = payload;
            const response = yield call(getVcReq, id);
            yield put({
                type: actions.GET_VIEW_COUNT_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_VIEW_COUNT_ERR
            })
        }
    });

}

const getTodayReq = async (id) => (axios.get(`${API_URL}api/app/courseCalendar/gettoday/${id}`));

export function* getToday() {
    yield takeEvery(actions.GET_TODAY_CAL_REQ, function* ({payload}) {
        try {
            const {id} = payload;
            const response = yield call(getTodayReq, id);
            yield put({
                type: actions.GET_TODAY_CAL_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_VIEW_COUNT_ERR
            })
        }
    });

}

export default function* rootSaga() {
    yield all([
        fork(getVc),
        fork(getUserCount),
        fork(getToday),

    ]);
}
