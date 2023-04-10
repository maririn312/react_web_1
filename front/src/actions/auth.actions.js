import * as ACTION_TYPES from './auth.constants'

export const login = (payload) => {
    return {
        type: ACTION_TYPES.LOGIN,
        payload
    }
}

export const logout = (payload) => {
    return {
        type: ACTION_TYPES.LOGOUT,
        payload
    }
}
