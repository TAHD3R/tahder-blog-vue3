import request from '../utils/requests'

export const get_banner = () => {
    return request({
        method: 'GET',
        url: '/banner',
        headers: { 'Content-Type': 'application/json' },
    })
}