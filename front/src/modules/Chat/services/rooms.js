import { authHeader } from '../../../utils';

const apiUrl = process.env.REACT_APP_API_URL;

const getOptions = {
    method: 'GET',
    headers: authHeader()
};


export const getRooms = (params, next) => {
    fetch(apiUrl + "/api/chat/rooms" + params, getOptions)
    .then(response => response.json())
    .then(result => next(result));
};
