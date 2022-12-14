import sjRequest from "..";

export function getBlogList(config) {
  return sjRequest.post(config, { url: "/getEssay" });
}
export function searchBlog(config) {
  return sjRequest.post(config, { url: "/searchBlog" });
}
