import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { articleActions } from '../slices/articleSlice';
import Comments from './Comments';

function Article() {
    const params = useParams();
    const { article, status, statusText } = useSelector(state => state.articleReducer);
    const boardList = useSelector(state => state.boardReducer.boardList);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(articleActions.getArticle(params?.articleId ?? 0));
    }, [dispatch, params?.articleId]);
    return (
        <>
            {status === 200 ? (
                <>
                    <div>
                        <span>게시판: </span>
                        <span>{boardList.length > 0 && boardList.find(board => board.id === parseInt(article?.boardId))?.name}</span>
                    </div>
                    <div>
                        <div>
                            <span>제목: </span>
                            <span>{article?.title ?? ''}</span>
                        </div>
                        <div>
                            <span>조회수: </span>
                            <span>{article?.views ?? ''}</span>
                        </div>
                        <div>
                            <span>작성일시: </span>
                            <span>{article?.insertDate ? new Date(article?.insertDate).toLocaleDateString() : ''}</span>
                        </div>
                        <div>
                            <span>내용: </span>
                            <span>{article?.content ?? ''}</span>
                        </div>
                    </div>
                    <div>
                        <Comments articleId={params?.articleId ?? 0} />
                    </div>
                </>
            ) : (
                <div>
                    <div>
                        <span>{status}</span>
                    </div>
                    <div>
                        <span>{statusText}</span>
                    </div>
                </div>
            )}
        </>
    );
}

export default Article;
