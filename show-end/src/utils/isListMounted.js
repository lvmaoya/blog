import { useStore } from "vuex";
import { onActivated, onMounted } from "vue";
import { onBeforeRouteLeave } from "vue-router";
export function isListMounted() {
  const store = useStore();
  onMounted(() => {
    store.dispatch("listContentMounted");
  });
  //   或是刷新浏览器
  onBeforeRouteLeave(() => {
    store.dispatch("resetMounteState");
  });
  onActivated(() => {
    store.dispatch("listContentMounted");
  });
}
