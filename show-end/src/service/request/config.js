/*
 * @Author: sun
 * @Date: 2022-10-18 08:55:20
 * @LastEditTime: 2022-12-08 09:29:14
 * @Description: Do not edit
 */
let BASE_URL = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  // BASE_URL = "	http://127.0.0.1:4523/m1/1770943-0-default";
  BASE_URL = "http://localhost:3000";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://sunjianxiang.cn:3000";
} else {
  BASE_URL = "http://sunjianxiang.cn:3000";
}
export { BASE_URL, TIME_OUT };
