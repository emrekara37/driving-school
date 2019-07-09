import {all, takeEvery, fork, call, put} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const getImageReq = async (id) => (axios.get(`${API_URL}api/app/courseImage/getlist/${id}`));

export function* getImage() {
    yield takeEvery(actions.GET_IMAGES_REQ, function* ({payload}) {
        try {
            const {id} = payload;
            const response = yield call(getImageReq, id);
            yield put({
                type: actions.GET_IMAGES_DONE,
                payload: response.data
            });

        } catch (e) {
            yield put({
                type: actions.GET_IMAGES_ERR
            });
        }


    });
}

const addFeatureReq = async (data) => (axios.post(`${API_URL}api/app/courseImage/add`, data));


export function* addImage() {
    yield takeEvery(actions.ADD_IMAGE_REQ, function* ({payload}) {
        try {
            const {data} = payload;
            const response = yield call(addFeatureReq, data);
            yield put({
                type: actions.ADD_IMAGE_DONE,
                payload: response.data.data
            })
        } catch (e) {
            yield put({
                type: actions.ADD_IMAGE_ERR
            });
        }
    });
}

const deleteImageReq = async (id) => (axios.delete(`${API_URL}api/app/courseImage/${id}`));

export function* deleteImage() {
    yield takeEvery(actions.DELETE_IMAGE_REQ, function* ({payload}) {
        try {
            const {id} = payload;
            yield call(deleteImageReq, id);
            yield put({
                type: actions.DELETE_IMAGE_DONE,
                payload: id
            })
        } catch (e) {
            yield put({
                type: actions.DELETE_IMAGE_ERR
            });
        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(getImage),
        fork(addImage),
        fork(deleteImage),
    ]);
}
