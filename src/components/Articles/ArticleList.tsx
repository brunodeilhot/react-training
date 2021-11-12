import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDefaultState, IStories } from '../../model/interface';
import Article from "./Article";
import api from '../../api';

const ArticleList = () => {

    const dispatch = useDispatch();
    const storiesState = useSelector((state: IDefaultState ) => state.stories)
    const updateArticlesState = useSelector((state: IDefaultState ) => state.updateArticles)


    useEffect(() => {
        api.getStories((serverStories: any) => dispatch({ type: 'FETCH_STORIES_SUCCESS', payload: serverStories }))
        api.getUsers((serverUsers: any) => dispatch({ type: 'FETCH_USER_SUCCESS', payload: serverUsers }))
        dispatch({ type: 'STOP_ARTICLE_UPDATE' })
        console.log('fetch story effect')
    },[dispatch, updateArticlesState]);

    const stories = storiesState
        .sort((a: IStories, b: IStories) => b.created > a.created ? 1 : -1)
        .map((story: any) => (
        <Article
            key={story.id}
            id={story.id}
            title={story.title}
            author={story.author}
            story={story.story.story}
            created={story.created}
            edited={story.edited}
        />
    ))

    return(
        <div className="article-list">
            {stories}
        </div>
    )
}

export default ArticleList;