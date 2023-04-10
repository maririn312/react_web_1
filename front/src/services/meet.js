// import { authHeader } from '../utils';
import Cookies from 'js-cookie';
const vcUrl = process.env.REACT_APP_MEET_URL;

export const createRoom = (params, next) => {
    const token = Cookies.get('client_token');

    let header = {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };

    fetch(vcUrl + "/create", header)
   .then(response => response.json())
   .then(result => next(result));
}
