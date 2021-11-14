import axios from "axios";

const baseURL = 'https://bdeilhot-react.herokuapp.com'

const api = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export function getUsers(success: any) {
    return api.get(`/users`)
        .then(checkStatus)
        .then(parseJson)
        .then(success);
}

export function getStories(success: any) {
    return api.get(`/stories`)
        .then(checkStatus)
        .then(parseJson)
        .then(success);
}

export function createStory(data: any) {
    return api.post(`/stories`, data)
    .then(checkStatus);
}

export function createUserAndStory(data: any) {
    api.post(`/users`, data.user).then(checkStatus);
    api.post(`/stories`, data.story).then(checkStatus);
    return
}

export function deleteStory(data: any) {
    return api.delete(`/stories?id=eq.${data}`)
    .then(checkStatus);
}

export function updateStory(data: any) {
    return api.put(`/stories?id=eq.${data.id}`, data)
    .then(checkStatus)
}

function checkStatus(response: any) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(`HTTP Error ${response.statusText}`);
    console.log(error);
    throw error;
}

function parseJson(response: any) {
    return response.data;
}

const methods = {
    getUsers,
    getStories,
    createStory,
    createUserAndStory,
    deleteStory,
    updateStory
};

export default methods;