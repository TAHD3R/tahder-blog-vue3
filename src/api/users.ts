import request from '../utils/requests'

export const login = (info: any) => {
    return request({
        method: 'POST',
        url: '/login',
        headers: { 'Content-Type': 'application/json' },
        data: info,
    })
}

export const register = (info: any) => {
    return request({
        method: 'POST',
        url: '/register',
        headers: { 'Content-Type': 'application/json' },
        data: info,
    })
}

export const update_userinfo = (info: any) => {
    return request({
        method: 'PUT',
        url: '/users/update',
        headers: { 'Content-Type': 'application/json' },
        data: info,
    })
}

export const logout = (token: any) => {
    return request({
        method: 'DELETE',
        url: '/logout',
        headers: { 'Authorization': 'Bearer ' + token },
    })
}

export const get_user = (token: any) => {
    return request({
        method: 'GET',
        url: '/me',
        headers: { 'Authorization': 'Bearer ' + token },
    })
}

export const get_userlist = () => {
    return request({
        method: 'GET',
        url: '/users',
    })
}