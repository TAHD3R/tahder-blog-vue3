import request from '../utils/requests';
import { ICategoryAPI } from '~/interfaces';

// 拉取文章分类
export const get_categories = () => {
  return request({
    method: 'GET',
    url: '/categories',
    headers: { 'Content-Type': 'application/json' },
  });
};

// 拉取文章下对应的文章
export const get_category_articles = (data: ICategoryAPI) => {
  return request({
    method: 'POST',
    url: '/categories/get',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  });
};
