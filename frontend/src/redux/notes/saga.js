import {all, takeEvery, put, call, fork} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";


const getNotesReq = async (id) => (axios.get(`${API_URL}api/app/courseNote/notes?cid=${id}`));

const addNotesReq = async (data) => (axios.post(`${API_URL}api/app/courseNote`, data));
const updateNotesReq = async (data) => (axios.put(`${API_URL}api/app/courseNote/${data.id}`, data));
const deleteNotesReq = async (id) => (axios.delete(`${API_URL}api/app/courseNote/${id}`));

export function* getNotes() {
    yield takeEvery(actions.GET_NOTES_REQ, function* ({payload}) {
        try {
            const {id} = payload;
            const response = yield call(getNotesReq, id);
            yield put({
                type: actions.GET_NOTES_DONE,
                payload: response.data
            })

        } catch (e) {
            yield put({
                type: actions.GET_NOTES_ERR
            })
        }
    });
}

export function* changeColor() {
    yield takeEvery(actions.CHANGE_COLOR, function* () {
    });
}

export function* addNote() {
    yield takeEvery(actions.ADD_NOTE, function* ({payload}) {
        try {
            const response = yield call(addNotesReq, payload);
            yield put({
                type: actions.ADD_NOTE_DONE,
                payload: response.data
            })
        } catch (e) {

        }
    });
}

export function* editNote() {
    yield takeEvery(actions.EDIT_NOTE, function* ({payload}) {
        yield call(updateNotesReq, payload);
    });
}

export function* deleteNote() {
    yield takeEvery(actions.DELETE_NOTE, function* ({payload}) {
        try {
            yield call(deleteNotesReq, payload);
        } catch (e) {

        }
    });
}

export default function* rootSaga() {
    yield all([
        fork(changeColor),
        fork(addNote),
        fork(editNote),
        fork(deleteNote),
        fork(getNotes),
    ]);
}
