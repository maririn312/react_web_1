import { authHeader } from '../_utils';

const apiUrl = process.env.REACT_APP_API_URL;

const getOptions = {
    method: 'GET',
    headers: authHeader()
};

export const getProjects = (params, next) => {
    fetch(apiUrl + "/api/projects" + params, getOptions)
   .then(response => response.json())
   .then(result => next(result));
};
