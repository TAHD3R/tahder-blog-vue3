import request from '../utils/requests'

export const get_banner = () => {
    return request({
        method: 'GET',
        url: '/banner',
        headers: { 'Content-Type': 'application/json' },
    })
}

export const get_stats = () => {
    return request({
        method: 'GET',
        url: '/stats',
        headers: { 'Content-Type': 'application/json' },
    })
}