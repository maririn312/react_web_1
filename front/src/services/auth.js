import { authHeader } from '../_utils';

const apiUrl = process.env.REACT_APP_API_URL;

const getOptions = {
    method: 'GET',
    headers: authHeader()
};

const postOptions = {
    method: 'POST',
    headers: authHeader()
};

export const getContent = (params, next) => {
    console.log('news list service', params);
    fetch(apiUrl + "/api/contents" + params, getOptions)
   .then(response => response.json())
   .then(result => next(result));
};

export const getTypes = (next) => {
    console.log('get content types service');
    fetch(apiUrl + "/api/contents/types", getOptions)
   .then(response => response.json())
   .then(result => next(result));
};

export const setContent = (datas) => {
    postOptions.body = JSON.stringify(datas);
    fetch(apiUrl + "/api/contents", postOptions)
   .then(response => response.json())
   .then(result => console.log(result));
};
