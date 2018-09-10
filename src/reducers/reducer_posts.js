import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action) { //default state to be an obj
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload);
        case FETCH_POST:
            // const post = action.payload.data;
            // const newState = {...state};
            // newState[post.id] = post;
            // return newState;
            //gather all posts in state and create a new obj with all posts
            //in brackets below key interpolation it takes 
            // adds them into overall state obj, as they add more
            return { ...state, [action.payload.data.id]: action.payload.data };
        case FETCH_POSTS: //case for incoming lists
            console.log(action.payload.data); //[post1, post2]
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}