import {all, takeEvery, fork, call, put} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const getPreRegReq = async (id) => (axios.get(`${API_URL}api/app/preRegistration/preRegs/${id}`));

export function* getPreRegs() {
    yield takeEvery(actions.GET_PREREG_REQ, function* ({payload}) {
        try {
            const {id} = payload;
            const response = yield call(getPreRegReq, id);
            yield put({
                type: actions.GET_PREREG_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_PREREG_ERR
            })
        }
    });
}

const changePreReq = async (data) => (axios.post(`${API_URL}api/app/preRegistration/change`, data));

export function* changePreReg() {
    yield takeEvery(actions.CHANGE_PREREG_REQ, function* ({payload}) {
        try {
            const {data} = payload;
            const response = yield call(changePreReq, data);
            yield put({
                type: actions.CHANGE_PREREG_DONE,
                payload: response.data
            })
        } catch (e) {
            yield put({
                type: actions.CHANGE_PREREG_ERR
            })
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getPreRegs),
        fork(changePreReg),
    ]);
}
