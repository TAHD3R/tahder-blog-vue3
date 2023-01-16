import request from '../utils/requests';
import { ILoginAPI, IRegisterAPI, IMessageReadAPI } from '~/interfaces';

// 登录
export const login = (info: ILoginAPI) => {
  return request({
    method: 'POST',
    url: '/login',
    headers: { 'Content-Type': 'application/json' },
    data: info,
  });
};

// 注册
export const register = (info: IRegisterAPI) => {
  return request({
    method: 'POST',
    url: '/register',
    headers: { 'Content-Type': 'application/json' },
    data: info,
  });
};

// 更新用户信息
export const update_userinfo = (info: string) => {
  return request({
    method: 'PUT',
    url: '/users/update',
    headers: { 'Content-Type': 'application/json' },
    data: info,
  });
};

// 退出登录
export const logout = (token: string) => {
  return request({
    method: 'DELETE',
    url: '/logout',
    headers: { Authorization: 'Bearer ' + token },
  });
};

// 获取用户
export const get_user = (token: string) => {
  return request({
    method: 'GET',
    url: '/me',
    headers: { Authorization: 'Bearer ' + token },
  });
};

// 拉取用户列表
export const get_userlist = () => {
  return request({
    method: 'GET',
    url: '/users',
  });
};

// 拉取站内私信
export const get_messages = () => {
  return request({
    method: 'GET',
    url: '/messages',
  });
};

// 已读私信
export const read_messages = (info: IMessageReadAPI) => {
  return request({
    method: 'DELETE',
    url: '/messages',
    data: info,
  });
};
