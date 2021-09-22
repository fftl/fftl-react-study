import { map } from 'ramda';
import { all, fork } from 'redux-saga/effects';
import boardSaga from './sagas/boardSaga';
import articleSaga from './sagas/articleSaga';
import commentSaga from './sagas/commentSaga';

let combineSagas = {};
combineSagas = Object.assign(combineSagas, { articleSaga, boardSaga, commentSaga });

export default function* rootSaga() {
    yield all(map(fork, combineSagas));
}
