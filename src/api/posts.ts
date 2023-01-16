import request from '../utils/requests';
import { IArticlePullAPI, IPublishAPI, IMakeCommentAPI, ISearchAPI } from '~/interfaces';

// 拉取文章
export const get_articles = (data?: IArticlePullAPI) => {
  return request({
    method: 'POST',
    url: '/articles',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  });
};

// 个人空间拉取文章
export const get_my_articles = () => {
  return request({
    method: 'GET',
    url: '/me/articles',
    headers: { 'Content-Type': 'application/json' },
  });
};

// 文章详情页拉取数据
export const get_article = (article_id: string | string[]) => {
  return request({
    method: 'GET',
    url: '/articles/' + article_id,
    headers: { 'Content-Type': 'application/json' },
  });
};

// 拉取热门文章(浏览量 > 1000)
export const get_articles_hot = () => {
  return request({
    method: 'GET',
    url: '/articles/hot',
    headers: { 'Content-Type': 'application/json' },
  });
};

// 发表文章
export const publish = (data: IPublishAPI) => {
  return request({
    method: 'POST',
    url: '/publish',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  });
};

// 拉取文章评论
export const get_comments = (article_id: string | string[]) => {
  return request({
    method: 'GET',
    url: '/comments/' + article_id,
    headers: { 'Content-Type': 'application/json' },
  });
};

// 发表评论
export const make_comment = (data: IMakeCommentAPI) => {
  return request({
    method: 'POST',
    url: '/comment',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  });
};

// 搜索文章
export const search = (data: ISearchAPI) => {
  return request({
    method: 'POST',
    url: '/search',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  });
};
