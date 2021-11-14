import api from '../api';
import { IStory } from '../model/interface';

export default function reducer(state: any, action: any) {
    
    switch (action.type) {
        case 'FETCH_STORIES_SUCCESS':
            return { 
                ...state,
                stories: action.payload,
                loading: false
            }
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                users: action.payload
            }
        case 'ADD_USER':
            api.createUser(action.user);
            console.log(action.user);
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case 'ADD_STORY':
            api.createStory(action.story);
            return {
                ...state,
                stories: [...state.stories, action.story],
                updateArticles: true
            }
        case 'REMOVE_STORY':
            const removeStoryIndex = state.stories.findIndex((story: IStory) => story.id === action.story.id);
            state.stories.splice(removeStoryIndex, 1);
            return{
                ...state,
                stories: [...state.stories]
            }
        case 'UPDATE_STORY':
            const updateStoryIndex = state.stories.findIndex((story: IStory) => story.id === action.story.id);
            state.stories.splice(updateStoryIndex, 1, action.story);
            api.updateStory(action.story);
            return {
                ...state,
                stories: [...state.stories]
            }
        case 'STOP_ARTICLE_UPDATE':
            return {
                ...state,
                updateArticles: false
            }
        case 'SEARCH_OPTION_CHANGE':
            return {
                ...state,
                searchOption: action.payload
            }
        case 'SEARCH_VALUE_CHANGE':
            return {
                ...state,
                searchValue: action.payload
            }
        default:
            return state
    }
    
}