import {all, takeEvery, put, call, fork} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const getPaymentReq = async (id) => (axios.get(`${API_URL}api/app/coursePayment/userPayment/${id}`));

export function* getPayment() {
    yield takeEvery(actions.GET_PAYMENT_REQ, function* ({payload}) {
        try {
            const response = yield call(getPaymentReq, payload);
            yield put({
                type: actions.GET_PAYMENT_DONE,
                payload: response.data
            })

        } catch (e) {
            yield put({
                type: actions.GET_PAYMENT_ERR
            })
        }
    });
}


export default function* rootSaga() {
    yield all([
        fork(getPayment),
    ]);
}
