<!--
 * @Author: sun
 * @Date: 2022-10-14 11:16:15
 * @LastEditTime: 2022-12-05 21:09:53
 * @Description: Do not edit
-->
<template>
  <header>
    <div class="navbar">
      <logo-view></logo-view>
      <nav class="menu">
        <ul>
          <li v-for="(item, index) in navList" :key="index" @click="handleMenuClick(item, index)">
            <a href="javascript:;" :class="{ isActive: item.value == 0 }">{{ item.label }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import LogoView from "@/baseUi/LogoView.vue";
import { watch } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  components: { LogoView },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const navList = ref([
      {
        label: "Home",
        value: 1,
      },
      {
        label: "Work",
        value: 1,
      },
      {
        label: "Blog",
        value: 1,
      },
      {
        label: "About",
        value: 1,
      },
    ]);

    // 重置activeBar，找到active,如果可以用beforerouterLeave会更好写，因为navbar不在routerView里，所以不能用
    const getActive = () => {
      for (let i of navList.value) {
        i.value = 1;
      }
      for (let i of navList.value) {
        if (route.path.slice(1).toUpperCase() == i.label.toUpperCase()) {
          i.value = 0;
        }
      }
    };

    watch(route, () => {
      getActive();
    });
    window.addEventListener("load", () => {
      getActive();
    });
    const handleMenuClick = async (item) => {
      await router.push({
        name: item.label,
      });
      getActive();
    };
    return {
      handleMenuClick,
      navList,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  position: sticky;
  top: 0px;
  width: 100%;
  z-index: 518;
  background-color: #fff;
  border-bottom: 1.2px solid rgb(189, 188, 188);
  display: flex;
  justify-content: center;
  .navbar {
    width: 80%;
    min-width: 375px;
    padding: 1.5em 0;
    display: flex;
    .logo {
      margin-left: 10px;
    }
    nav {
      flex: 1;
      display: flex;
      justify-content: end;
      ul {
        display: flex;
        li {
          max-width: 70px;
          padding: 0 10px;
          a {
            font-size: 1em;
          }
        }
      }
    }
  }
  .navbarPhone ul {
    display: flex;
    justify-content: space-around;
  }
  .isActive {
    color: black;
  }
}
</style>
