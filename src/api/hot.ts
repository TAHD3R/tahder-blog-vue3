import request from '../utils/requests'

export const get_ads = () => {
    return request({
        method: 'GET',
        url: '/ads',
        headers: { 'Content-Type': 'application/json' },
    })
}