import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=dragon55';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request //assign request to payload property
    };
}

export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    }
}

// make request to our API with axios and request an action that contains 
// request as the payload
//using a callback to navigate after post has been made.
// using with onSubmit and routes
export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
        .then(() => callback());

    return {
        type: CREATE_POST,
        payload: request
    };
}

export function deletePost(id, callback) {
    const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

    return {
        type: DELETE_POST,
        payload: id
    };
}