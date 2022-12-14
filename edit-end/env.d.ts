/// <reference types="vite/client" />
declare module "*.vue" {
  import { App, defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void;
  };
  export default component;
}
declare module "@kangc/v-md-editor";
declare module "@kangc/v-md-editor/lib/theme/vuepress.js";
declare module "prismjs";
declare module "vue-animate-number";
declare module "@kangc/v-md-editor/lib/preview";
declare module "@kangc/v-md-editor/lib/theme/github";
