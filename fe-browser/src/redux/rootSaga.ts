import { authSaga } from '../modules/AuthModule/sagas/authSaga'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([authSaga()])
}
