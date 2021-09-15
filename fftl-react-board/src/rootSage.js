import { map } from 'ramda';
import { all, fork } from 'redux-saga/effects';
import boardSaga from './sagas/boardSaga';
import articleSaga from './sagas/articleSaga';

let combineSagas = {};
combineSagas = Object.assign(combineSagas, { articleSaga, boardSaga });

export default function* rootSaga() {
    yield all(map(fork, combineSagas));
}
