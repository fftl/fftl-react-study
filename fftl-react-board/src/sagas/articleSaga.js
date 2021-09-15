import { all, call, retry, fork, put, take, select } from 'redux-saga/effects';
import { articleActions } from '../slices/articleSlice';
import axios from '../utils/axios';
import qs from 'query-string';

const SECOND = 1000;

//api 서버 연결 주소
function apiGetArticle(articleId) {
    return axios.get(`articles/${articleId}`);
}

function apiGetArticleList(requestParams) {
    return axios.get(`articles?${qs.stringify(requestParams)}`);
}

//api 서버 연결 후 action 호출
function* asyncGetArticleList(action) {
    try {
        // const response = yield call(apiGetArticleList, { boardId: action.payload });
        const response = yield retry(3, 10 * SECOND, apiGetArticleList, { boardId: action.payload });
        if (response?.status === 200) {
            yield put(articleActions.getArticleListSuccess(response));
        } else {
            yield put(articleActions.getArticleListFail(response));
        }
    } catch (e) {
        yield put(articleActions.getArticleListFail(e.response));
    }
}

//action호출을 감시하는 watch 함수
function* watchGetArticleList() {
    while (true) {
        const action = yield take(articleActions.getArticleList);
        yield call(asyncGetArticleList, action);
    }
}

export default function* articleSaga() {
    yield all([fork(watchGetArticleList)]);
}
