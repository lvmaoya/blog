/*
 * @Author: sun
 * @Date: 2022-10-23 09:44:12
 * @LastEditTime: 2022-12-11 23:29:05
 * @Description: Do not edit
 */
import sjRequest from "..";
// 这里的config只是查询时的参数
export function getArticleDetail(config) {
  return sjRequest.get({ url: "/getDetail?id=" + config.id });
}
export function getDianZanNum(config) {
  return sjRequest.get({ url: "/getDianZanNum?id=" + config.id });
}
export function changeABackPreferNum(config) {
  return sjRequest.post(config, { url: "/changeABackPreferNum" });
}

export function getPingLun(config) {
  return sjRequest.get({ url: "/getPingLun?id=" + config.id });
}
export function changePVData(config) {
  return sjRequest.post(config, { url: "/changePVData" });
}
export function commitComment(config) {
  return sjRequest.post(config, { url: "/commitComment" });
}
