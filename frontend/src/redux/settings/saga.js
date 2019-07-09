import {all, takeEvery, fork, call, put} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const getSettingsReq = async (id) => (axios.get(`${API_URL}api/app/course/course/${id}`));

export function* getSettings() {
    yield takeEvery(actions.GET_SETTINGS_REQ, function* ({payload}) {
        try {
            const {id} = payload;
            const response = yield call(getSettingsReq, id);
            yield put({
                type: actions.GET_SETTINGS_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_SETTINGS_ERR
            })
        }
    });
}

const setSettingsReq = async (form) => (axios.post(`${API_URL}api/app/course/setCourse`, form));

export function* setSettings() {
    yield  takeEvery(actions.SET_SETTINGS_REQ, function* ({payload}) {
        try {
            const {data} = payload;
            const response = yield call(setSettingsReq, data);
            yield put({
                type: actions.SET_SETTINGS_DONE,
                payload: response.data
            })
        } catch (e) {
            yield put({
                type: actions.SET_SETTINGS_ERR
            })
        }
    })
}
export default function* rootSaga() {
    yield all([
        fork(getSettings),
        fork(setSettings),
    ]);
}
