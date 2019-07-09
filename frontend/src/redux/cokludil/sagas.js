import {all, takeEvery, put, call, fork} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const getLanguages = async (data) => (axios.get(`${API_URL}api/app/localizationvalue/${data}`));

export function* getLangRequest() {
    yield takeEvery(actions.GET_LANGUAGE_REQUEST, function* ({payload}) {
        try {
            const {data} = payload;
            const response = yield call(getLanguages, data);
            yield put({
                type: actions.GET_LANGUAGE_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_LANGUAGE_ERROR
            })
        }
    });

}

export default function* rootSaga() {
    yield all([
        fork(getLangRequest),

    ]);
}
