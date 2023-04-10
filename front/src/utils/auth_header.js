import Cookies from 'js-cookie';

export function authHeader() {
    const token = Cookies.get('client_token');

    if(token) {
        return { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' };
    }
    return {
        method: "GET"
    };
}
