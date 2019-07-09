import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import contactSagas from './contacts/saga';
import notesSagas from './notes/saga';
import todosSagas from './todos/saga';
import dashSaga from './dashb/saga';
import calendarSage from './calendar/saga';
import imageSaga from './image/saga';
import carSaga from './car/saga';
import featureSage from './feature/saga';
import settingsSaga from './settings/saga';
import paymentSaga from './payment/saga';
import notificationSaga from './notifications/saga';
import preRegSaga from './prereg/saga';
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    paymentSaga(),
    preRegSaga(),
    contactSagas(),
    notificationSaga(),
    featureSage(),
    imageSaga(),
    notesSagas(),
    todosSagas(),
    calendarSage(),
    settingsSaga(),
    carSaga(),
    dashSaga(),
  ]);
}
