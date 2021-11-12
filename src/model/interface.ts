export interface IStories {
    id: number,
    title: string,
    author: number,
    story: string,
    created: string,
    edited: string
}
export interface IArticleProps extends IStories {
    key: number
}

export interface IAvatar {
    name: string,
    picture: string,
    joined: string
}

export interface IUsers extends IAvatar {
    id: number
}

export interface IStory {
    id: number,
    title: string,
    story: string,
    created: string,
    edited: string,
    author: number
}

export interface IDefaultState {
    users: Array<IUsers>,
    stories: Array<IStories>,
    updateArticles: boolean
}

export interface IErrorMessage {
    title: [],
    story: []
}