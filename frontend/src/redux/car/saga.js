import {all, takeEvery, fork, call, put} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const addCarReq = async (data) => (axios.post(`${API_URL}api/app/courseCar`, data));

export function* addCar() {
    yield takeEvery(actions.ADD_CAR_REQ, function* ({payload}) {
        try {
            const {data} = payload;
            const response = yield call(addCarReq, data);
            yield put({
                type: actions.ADD_CAR_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.ADD_CAR_ERR
            })
        }
    });
}

const getCarsReq = async (data) => (axios.get(`${API_URL}api/app/getallcar/${data}`))

export function* getCars() {
    yield takeEvery(actions.GET_CARS_REQ, function* ({payload}) {
        try {

            const {data} = payload;
            const response = yield call(getCarsReq, data);
            yield put({
                type: actions.GET_CARS_DONE,
                payload: response.data
            })
        } catch (e) {
            yield put({type: actions.GET_CARS_ERR})
        }

    });
}

const deleteCarReq = async (id) => (axios.get(`${API_URL}api/app/deletecar/${id}`));

export function* deleteCar() {
    yield  takeEvery(actions.DELETE_CAR, function* ({payload}) {
        try {

            const {id} = payload;
             yield call(deleteCarReq, id);
        } catch (e) {
        }
    })
}

export default function* rootSaga() {
    yield all([
        fork(addCar),
        fork(getCars),
        fork(deleteCar),
    ]);
}
