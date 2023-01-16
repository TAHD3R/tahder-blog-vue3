export default interface IBannerItem {
  author: string;
  avatar: string;
  create_at: number;
  id: number;
  img: string;
  summary: string;
  title: string;
  views: number;
}

export default interface IArticleItem {
  author: string;
  avatar: string;
  category: string;
  comments: number;
  content: string;
  created_time: number;
  description: string;
  id: number;
  summary: string;
  title: string;
  user_id: number;
  view: number;
}

export interface IRegisterAPI {
  username: string;
  nickname: string;
  password: string;
  repassword: string;
}

export interface ILoginAPI {
  username: string;
  password: string;
}

export interface IArticlePullAPI {
  page: number;
}

export interface IPublishAPI {
  author: string;
  title: string;
  content: string;
  summary: string;
  category: number;
}

export interface IArticleCaterogyAPI {
  category: number;
}

export interface ICommentAPI {
  user_id: number;
  article_id: number;
  comment: string;
  parent_id: number;
}

export interface ISearchAPI {
  query: string;
}

export interface IUpdateInfoAPI {
  nickname: string;
  description: string;
}

export interface IMessageReadAPI {
  id: number;
}

export interface IMakeCommentAPI {
  user_id: string;
  article_id: string | string[];
  comment: string | string[];
  parent_id: number;
}

export interface ICategoryAPI {
  category: string | number;
}
