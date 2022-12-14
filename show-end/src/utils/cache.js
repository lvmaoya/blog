/*
 * @Author: sun
 * @Date: 2022-11-22 18:27:14
 * @LastEditTime: 2022-12-10 13:36:43
 * @Description: Do not edit
 */
class LocalCache {
  setCache(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  getCache(key) {
    const value = window.localStorage.getItem(key);
    if (value != null) {
      return JSON.parse(value);
    }
  }
  deleteCache(key) {
    window.localStorage.removeItem(key);
  }
  clearCache() {
    window.localStorage.clear();
  }
}
export default new LocalCache();
