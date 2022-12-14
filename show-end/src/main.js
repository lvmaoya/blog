/*
 * @Author: sun
 * @Date: 2022-10-14 08:26:49
 * @LastEditTime: 2022-12-12 17:04:52
 * @Description: Do not edit
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css";
import "@/assets/css/base.css";
import "@/icons/iconfont.js";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";

// v-md-editor
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
// 引入主题
import githubTheme from "@kangc/v-md-editor/lib/theme/github";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

// loading
import Loading from "@/components/loading/index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});

app.use(Loading);

app.use(VMdPreview);

app.use(store).use(router).mount("#app");
export default app;
