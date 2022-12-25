import request from "../utils/requests";

export const get_articles = (data: any = null) => {
  return request({
    method: "POST",
    url: "/articles",
    headers: { "Content-Type": "application/json" },
    data: data,
  });
};

export const get_my_articles = () => {
  return request({
    method: "GET",
    url: "/me/articles",
    headers: { "Content-Type": "application/json" },
  });
};

export const get_article = (id: any) => {
  return request({
    method: "GET",
    url: "/articles/" + id,
    headers: { "Content-Type": "application/json" },
  });
};

export const get_articles_hot = () => {
  return request({
    method: "GET",
    url: "/articles/hot",
    headers: { "Content-Type": "application/json" },
  });
};

export const publish = (data: any) => {
  return request({
    method: "POST",
    url: "/publish",
    headers: { "Content-Type": "application/json" },
    data: data,
  });
};

export const get_comments = (article_id: any) => {
  return request({
    method: "GET",
    url: "/comments/" + article_id,
    headers: { "Content-Type": "application/json" },
  });
};

export const make_comment = (data: any) => {
  return request({
    method: "POST",
    url: "/comments",
    headers: { "Content-Type": "application/json" },
    data: data,
  });
};
