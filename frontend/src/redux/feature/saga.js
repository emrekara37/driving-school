import {all, takeEvery, fork, call, put} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const getFeatureReq = async (data) => (axios.get(`${API_URL}api/app/courseFeature/getbykey/${data.key}/${data.id}`));

export function* getFeature() {
    yield takeEvery(actions.GET_FEATURE_REQ, function* ({payload}) {
        try {
            const {data} = payload;
            const response = yield call(getFeatureReq, data);
            yield put({
                type: actions.GET_FEATURE_DONE,
                payload: response.data
            });

        } catch (e) {
            yield put({
                type: actions.GET_FEATURE_ERR
            });
        }


    });
}

const addFeatureReq = async (data) => (axios.post(`${API_URL}api/app/courseFeature`, data));

const updateFeatureReq = async (data) => (axios.put(`${API_URL}api/app/courseFeature/${data.id}`, data));

export function* addFeature() {
    yield takeEvery(actions.ADD_FEATURE_REQ, function* ({payload}) {
        try {
            const {data} = payload;
            let response;
            if (data.id > 0) {
                response = yield call(updateFeatureReq, data);
            } else {
                response = yield call(addFeatureReq, data);
            }
            yield put({
                type: actions.ADD_FEATURE_DONE,
                payload: response.data
            })
        } catch (e) {
            yield put({
                type: actions.ADD_FEATURE_ERR
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getFeature),
        fork(addFeature),
    ]);
}
