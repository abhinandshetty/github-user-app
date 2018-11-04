import {FETCH_USER, FETCH_USER_REPOS, FETCH_USERS} from "../actions/types";

export const fetchUsers = () => dispatch => {
    fetch('https://api.github.com/users')
        .then(res => res.json())
        .then(users => dispatch({
            type: FETCH_USERS,
            payload: users
        }));
};

export const fetchUserInformation = (username) => dispatch => {
    fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json())
        .then(data => dispatch({
            type: FETCH_USER,
            payload: [data]
        }));
}