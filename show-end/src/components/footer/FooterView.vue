<!--
 * @Author: sun
 * @Date: 2022-10-15 16:49:44
 * @LastEditTime: 2022-12-11 21:24:06
 * @Description: Do not edit
-->
<template>
  <div class="footer" v-show="isListContentMounted">
    <div class="footerLogo"><logo-view></logo-view></div>
    <div class="contact">
      <ul>
        <li class="email">
          <span><a href="javascript:;">1504734652@qq.com</a></span>
        </li>
        <li>
          <a href="javascript:;">
            <el-tooltip placement="top">
              <template #content> 17638331208 </template>
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin"></use>
                </svg>
              </span>
            </el-tooltip>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <el-tooltip placement="top">
              <template #content> 1504734652 </template>
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-QQ"></use>
                </svg>
              </span>
            </el-tooltip>
          </a>
        </li>
      </ul>
    </div>
    <div class="copyright">
      <p>Copyright © 2022 lvmaoya All rights reserved.</p>
      <br />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import LogoView from "@/baseUi/LogoView.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: { LogoView },
  setup() {
    const store = useStore();
    let isListContentMounted = computed(() => store.state.isListContentMounted);

    return { isListContentMounted };
  },
};
</script>

<style lang="scss" scoped>
.footer {
  position: sticky;
  z-index: 0;
  bottom: 0;
  width: 100%;
  margin: 0 auto;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  .footerLogo {
    padding-top: 4em;
  }
  .contact {
    // display: flex;
    // justify-content: center;
    padding-top: 2.5em;
    ul {
      display: flex;
      .email {
        padding-right: 3em;
      }
      a svg {
        font-size: 1.5em;
      }
    }
  }
  .copyright {
    font-size: 0.75em;
    text-align: center;
    padding: 2em 0 2em 0;
    p {
      font: 16px "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC",
        "WenQuanYi Micro Hei", sans-serif;
    }
    a {
      cursor: pointer;
    }
  }
}
</style>
