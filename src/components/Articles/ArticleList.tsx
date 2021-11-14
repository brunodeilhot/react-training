import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDefaultState, IStories } from '../../model/interface';
import Article from "./Article";
import Loading from "./Loading";
import api from '../../api';

const ArticleList = () => {

    const dispatch = useDispatch();
    const userState = useSelector((state: IDefaultState ) => state.users)
    const storiesState = useSelector((state: IDefaultState ) => state.stories)
    const updateArticlesState = useSelector((state: IDefaultState ) => state.updateArticles)
    const isLoading = useSelector((state: IDefaultState) => state.loading)
    const searchOption = useSelector((state: IDefaultState) => state.searchOption)
    const searchValue = useSelector((state: IDefaultState) => state.searchValue)

    useEffect(() => {
        api.getStories((serverStories: any) => dispatch({ type: 'FETCH_STORIES_SUCCESS', payload: serverStories }))
        api.getUsers((serverUsers: any) => dispatch({ type: 'FETCH_USER_SUCCESS', payload: serverUsers }))
        dispatch({ type: 'STOP_ARTICLE_UPDATE' })
        console.log('fetch story effect')
    },[dispatch, updateArticlesState]);

    const username = userState.filter(
        (user: any) => {
            return user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) 
        }
    );

    const stories = searchValue === '' 
        ? storiesState
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
        : storiesState
        .sort((a: IStories, b: IStories) => b.created > a.created ? 1 : -1)
        .filter(searchOption === 'title' 
                ? (story: any) => story.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                : (story: any) => story.author === {...username[0]}.id
                )
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
        <>
        {isLoading ? <Loading /> : null}
        <div className="article-list">
            {stories}
        </div>
        </>
    )
}

export default ArticleList;