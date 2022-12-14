<!--
 * @Author: sun
 * @Date: 2022-10-14 14:37:13
 * @LastEditTime: 2022-12-06 19:51:27
 * @Description: Do not edit
-->
<template>
  <div class="aboutView">
    <div class="ww">
      <div class="w">
        <div class="introduce">
          <span v-html="userInfo.introduce"></span>
        </div>
        <div class="contact">
          <ul>
            <li>
              <a href="https://mail.qq.com/" target="_blank"><span>Email </span>lvmaoya@foxmail.com</a>
            </li>
            <li>
              <a href="https://github.com/lvmaoya" target="_blank"><span class="github">Github</span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>

<script>
import { getUserInfo } from "@/service/about";
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { isListMounted } from "@/utils/isListMounted";

export default {
  setup() {
    isListMounted();
    let userInfo = ref({});

    onMounted(async () => {
      const userInfoDataList = await getUserInfo();
      userInfo.value = userInfoDataList.data.data;
    });

    return { userInfo };
  },
};
</script>

<style lang="scss" scoped>
.w {
  padding-top: 8vh;
  border: none;
  padding-bottom: 60vh;

  .introduce {
    display: flex;
    align-items: center;
    padding-bottom: 5em;
  }
  .contact {
    a {
      span {
        margin-right: 5px;
        font-size: 1.5em;
        color: #666;
      }
      .github {
        display: block;
        padding: 1em 0;
        font-size: 1.3em;
      }
    }
    padding: 0 0.5em 0 0;
  }
}
</style>
