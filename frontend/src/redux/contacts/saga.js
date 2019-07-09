import {all, takeEvery, fork, call, put} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL, CLIENT_API_URL} from "../../settings";

const getUsersReq = async (data) => (axios.get(`${API_URL}api/app/clientUser/courseUsers/${data}`));

export function* getUsers() {
    yield takeEvery(actions.GET_USERS_REQUEST, function* ({payload}) {
        try {
            const {data} = payload;
            const response = yield call(getUsersReq, data);
            yield put({
                type: actions.GET_USERS_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_USERS_ERROR
            })
        }
    });

}

const addStudentReq = async (data) => (axios.post(`${API_URL}api/app/courseStudent`, data));
const addStudentCourseReq = async (data) => (axios.post(`${CLIENT_API_URL}api/licenses/DrivingSchoolRegister`,data));

export function* addContact() {
    yield takeEvery(actions.ADD_CONTACT_REQ, function* ({payload}) {
        try {
            const {data} = payload;
            const request = data.type === "ozel" ? addStudentReq : addStudentCourseReq;
            const response = yield call(request, data);
            yield put({
                type: actions.ADD_CONTACT_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.ADD_CONTACT_ERR
            })
        }

    });
}

export function* editContact() {
    yield takeEvery(actions.EDIT_CONTACT, function* () {
    });
}

const deprecateUserReq = async (id) => (axios.get(`${API_URL}api/app/clientUser/deprecateUser/${id}`));

export function* deleteContact() {
    yield takeEvery(actions.DELETE__CONTACT, function* ({payload}) {
        const {id} = payload;
        yield call(deprecateUserReq, id);
    });
}

export default function* rootSaga() {
    yield all([
        fork(addContact),
        fork(editContact),
        fork(deleteContact),
        fork(getUsers)
    ]);
}
