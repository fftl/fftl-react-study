import { all, call, fork, put, select, take } from 'redux-saga/effects';
import { commentAction, commentActions } from '../slices/commentSlice';
import axios from '../utils/axios';
import qs from 'query-string';

//api 서버 연결 주소
function apiGetCommentList(requestParams) {
    return axios.get(`comments?${qs.stringify(requestParams)}`);
}

function apiInsertComment(requestBody) {
    return axios.post(`comments`, requestBody);
}

function apiDeleteComment(commentId) {
    return axios.delete(`comments/${commentId}`);
}

function* asyncGetCommentList(action) {
    try {
        const response = yield call(apiGetCommentList, { articleId: action.payload });
        if (response.status === 200) {
            yield put(commentActions.getCommentListSuccess(response));
        } else {
            yield put(commentActions.getCommentListFail(response));
        }
    } catch (e) {
        console.error(e);
        yield put(commentActions.getCommentListFail(e.response));
    }
}
