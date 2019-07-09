import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import {getToken, clearToken} from '../../helpers/utility';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const loginCall = async (data) => (axios.post(`${API_URL}api/app/auth/login`, data));

export function* loginRequest({payload}) {
    try {

        const {data} = payload;
        console.log(data);
        const response = yield call(loginCall, data);
        yield localStorage.setItem('courseInfo', JSON.stringify(response.data.course));
        yield put({
            type: actions.LOGIN_SUCCESS,
            token: response.data.token,
            profile: 'Profile',
        });
    } catch (e) {
        console.log(e);
        yield put({
            type: actions.LOGIN_ERROR
        })
    }
}

export function* loginSuccess() {
    yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
        yield localStorage.setItem('id_token', payload.token);

    });
}

export function* loginError() {
    yield takeEvery(actions.LOGIN_ERROR, function* () {

    });
}

export function* logout() {
    yield takeEvery(actions.LOGOUT, function* () {
        clearToken();
        yield put(push('/'));
    });
}

export function* checkAuthorization() {
    yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
        const token = getToken().get('idToken');
        if (token) {
            yield put({
                type: actions.LOGIN_SUCCESS,
                token: token,
                profile: 'Profile',
            });
        }

    });
}

export default function* rootSaga() {
    yield all([
        fork(checkAuthorization),
        takeEvery(actions.LOGIN_REQUEST, loginRequest),
        fork(loginSuccess),
        fork(loginError),
        fork(logout),
    ]);
}
