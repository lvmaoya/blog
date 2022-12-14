<!--
 * @Author: sun
 * @Date: 2022-10-14 08:26:49
 * @LastEditTime: 2022-12-13 15:50:50
 * @Description: Do not edit
-->
<template>
  <NavBar></NavBar>
  <transition name="fade" mode="out-in">
    <router-view v-slot="{ Component }">
      <KeepAlive exclude="detailArticleView">
        <Component :is="Component" :key="route.name"></Component>
      </KeepAlive>
    </router-view>
  </transition>
  <!-- <router-view></router-view> -->
</template>

<script>
import { useRoute } from "vue-router";
import NavBar from "./components/navbar/NavBar.vue";
export default {
  setup() {
    const route = useRoute();
    return { route };
  },
  components: { NavBar },
};
</script>

<style lang="scss" scoped>
/* 渐变设置 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.6, 0.6, 1);
}
</style>
