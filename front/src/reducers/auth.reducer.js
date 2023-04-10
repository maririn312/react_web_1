import Cookies from 'js-cookie';

const authReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            Cookies.set('client_token', action.data.token, { path: '' });
            return {
                ...state,
                isAuth: true,
                token: action.data.token
            }
        case "LOGOUT":
            Cookies.remove('client_token');
            return {
                ...state,
                isAuth: false,
                token: null
            }
        default:
            return state
    }
};

export { authReducer };
