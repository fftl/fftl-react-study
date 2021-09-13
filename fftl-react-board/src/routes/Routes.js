import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../views/Main';
import Article from '../views/Article';
import ArticleList from '../views/ArticleList';
import Post from '../views/Post';
import Control from '../views/Control';

function Routes() {
    return (
        <div>
            <Switch>
                <Route path={'/'} exact component={Main} />
                <Route path={'/board/:boardId'} exact component={ArticleList} />
                <Route path={'/article/:articleId'} exact component={Article} />
                <Route path={'/insert'} exact component={Post} />
                <Route path={'/update/:articleId'} exact component={Post} />
                <Route path={'/control'} exact component={Control} />
                <Route path={'*'} component={Main} />
            </Switch>
        </div>
    );
}

export default Routes;
