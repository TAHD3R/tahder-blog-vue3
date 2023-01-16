import request from '../utils/requests';

// 拉取轮播图
export const get_banner = () => {
  return request({
    method: 'GET',
    url: '/banner',
    headers: { 'Content-Type': 'application/json' },
  });
};
