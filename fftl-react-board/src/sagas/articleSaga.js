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

function apiPutArticle(requestBody) {
    return axios.put(`articles/${requestBody?.id}`, requestBody);
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

function* asyncGetArticle(action) {
    try {
        const response = yield call(apiGetArticle, action.payload);
        if (response?.status === 200) {
            yield put(articleActions.getArticleSuccess()); // 조회 성공확인만 판단하는 용도로 남김
            yield put(articleActions.updateArticleViews(response.data));
        } else {
            yield put(articleActions.getArticleFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(articleActions.getArticleFail(e.response));
    }
}

function* asyncUpdateArticleViews(action) {
    try {
        const response = yield call(apiPutArticle, {
            ...action.payload,
            views: parseInt(action.payload?.views ?? 0) + 1,
            updateDate: Date.now(),
        });
        if (response?.status === 200) {
            yield put(articleActions.updateArticleViewsSuccess(response));
        } else {
            yield put(articleActions.updateArticleViewsFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(articleActions.updateArticleViewsFail(3?.response));
    }
}

//action호출을 감시하는 watch 함수
function* watchGetArticleList() {
    while (true) {
        const action = yield take(articleActions.getArticleList);
        yield call(asyncGetArticleList, action);
    }
}

function* watchGetArticle() {
    while (true) {
        const action = yield take(articleActions.getArticle);
        yield call(asyncGetArticle, action);
    }
}

function* watchUpdateArticleViews() {
    while (true) {
        const action = yield take(articleActions.updateArticleViews);
        yield call(asyncUpdateArticleViews, action);
    }
}

export default function* articleSaga() {
    yield all([fork(watchGetArticleList), fork(watchGetArticle), fork(watchUpdateArticleViews)]);
}
