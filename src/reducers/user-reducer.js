import {FETCH_USER, FETCH_USER_REPOS, FETCH_USERS} from "../actions/types";

const initialState = {
    userlist: [],
    user: [],
    repos: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USERS :
            return {
                ...state,
                userlist: action.payload
            };
        case FETCH_USER :
            return {
                ...state,
                userlist: action.payload
            };
        case FETCH_USER_REPOS:
            return {
                ...state,
                repos: action.payload
            };
        default:
            return state;
    }
}