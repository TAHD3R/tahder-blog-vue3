import request from "../utils/requests";

export const get_categories = () => {
  return request({
    method: "GET",
    url: "/categories",
    headers: { "Content-Type": "application/json" },
  });
};

export const get_category_articles = (data: any) => {
    return request({
      method: "POST",
      url: "/categories/get",
      headers: { "Content-Type": "application/json" },
      data: data,
    });
  };