import {all, takeEvery, put,call,fork} from 'redux-saga/effects';
import actions from './actions';
import axios from 'axios';
import {API_URL} from "../../settings";

const getRoomsReq = async (data) => (axios.get(`${API_URL}api/app/localizationvalue/${data}`));

export function* getRooms() {
    yield takeEvery(actions.GET_ROOMS_REQUEST_ERROR, function* ({payload}) {
        try {
            const {data} = payload;
            const response = yield call(getRoomsReq, data);
            yield put({
                type: actions.GET_ROOMS_REQUEST_DONE,
                payload: response.data,
            });
        } catch (e) {
            yield put({
                type: actions.GET_ROOMS_REQUEST_ERROR
            })
        }
    });

}

export default function* rootSaga() {
    yield all([
        fork(getRooms),

    ]);
}
