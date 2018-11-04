import {FETCH_USER, FETCH_USER_REPOS, FETCH_USERS} from "../actions/types";

export const fetchUsers = (callback =() =>{}) => dispatch => {
    fetch('https://api.github.com/users')
        .then(res => res.json())
        .then(users => {
            dispatch({
                type: FETCH_USERS,
                payload: users
            });
            callback();
        });
};

export const searchUser = (username) => dispatch => {
    fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_USER,
            payload: [data]
        }));
};

export const fetchUserRepositories = (username) => dispatch => {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json())
        .then(repos => dispatch({
            type: FETCH_USER_REPOS,
            payload: repos
        }));
};