/*
 * @Author: sun
 * @Date: 2022-10-28 20:49:12
 * @LastEditTime: 2022-12-05 14:25:37
 * @Description: Do not edit
 */
import { createApp } from "vue";
// element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// v-md-editor
// 写
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import Prism from "prismjs";
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
// 读
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

import App from "./App.vue";
import router from "./router";

import "@/assets/css/reset.css";
// animate动画
import "animate.css";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus);

app.use(VueMarkdownEditor);
app.use(VMdPreview);

app.use(router);

app.mount("#app");
