import { authHeader } from '../utils';

const apiUrl = process.env.REACT_APP_API_URL;

const getOptions = {
    method: 'GET',
    headers: authHeader()
};

// const postOptions = {
//     method: 'POST',
//     headers: authHeader()
// };

export const getUsers = (params, next) => {
    fetch(apiUrl + "/api/users" + params, getOptions)
    .then(response => response.json())
    .then(result => next(result));
};
