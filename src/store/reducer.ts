import api from '../api';
import { IStory } from '../model/interface';

export default function reducer(state: any, action: any) {
    switch (action.type) {
        case 'FETCH_STORIES_SUCCESS':
            return { 
                ...state,
                stories: action.payload
            }
        case 'FETCH_USER_SUCCESS':
            return {
                ...state,
                users: action.payload
            }
        case 'ADD_USER':
            api.createUser(action.user);
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
            const storyIndex = state.stories.findIndex((story: IStory) => story.id === action.payload);
            state.stories.splice(storyIndex, 1);
            return{
                ...state,
                stories: [...state.stories]
            }
        case 'STOP_ARTICLE_UPDATE':
            return {
                ...state,
                updateArticles: false
            }
        default:
            return state
    }
    
}