import sjRequest from "..";

export function getArticleList(config) {
  return sjRequest.post(config, { url: "/getArticle" });
}
// 如果以后随笔文章想要分类功能可以传入参数essay
export function getArticleCategoryList(config) {
  return sjRequest.get({ url: "/getArticleCategory?category=" + config });
}
export function searchArticle(config) {
  return sjRequest.post(config, { url: "/searchArticle" });
}

export function getRecentArticleList(config) {
  return sjRequest.post(config, { url: "/getRecentArticle" });
}

export function getHotArticleList(config) {
  return sjRequest.post(config, { url: "/getHotArticle" });
}
export function getArticleByCategoryData(config) {
  return sjRequest.post(config, { url: "/getArticleByCategory" });
}
