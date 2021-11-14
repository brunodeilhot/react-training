import { IDefaultState } from './../model/interface';
import { createStore } from 'redux';
import reducer from './reducer';

const initialState: IDefaultState = {
    users: [],
    stories: [],
    updateArticles: false,
    loading: true,
    searchOption: 'title',
    searchValue: ''
};

export const store = createStore(reducer, initialState);