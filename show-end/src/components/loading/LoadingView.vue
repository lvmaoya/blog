<!--
 * @Author: sun
 * @Date: 2022-11-21 13:39:30
 * @LastEditTime: 2022-12-12 13:55:35
 * @Description: Do not edit
-->
<template>
  <div id="loading" v-show="visible">
    <!-- <video src="@/assets/img/loading.mp4" autoplay loop></video> -->
    <!-- <div class="circle"></div> -->
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "LoadingView",
  setup() {
    // 控制组件的状态
    let visible = ref(false);

    // 显示组件
    let showLoading = () => {
      visible.value = true;
    };
    // 隐藏组件
    let hideLoading = () => {
      visible.value = false;
    };

    return { visible, showLoading, hideLoading };
  },
});
</script>
<style scoped>
#loading {
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0.1;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* @keyframes loading {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(160deg);
  }

  100% {
    transform: rotate(360deg);
  }
} */
/* .circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 6px solid #222;
  border-left-color: #ccc;

  animation: loading 1s linear 1s infinite;
} */
</style>
