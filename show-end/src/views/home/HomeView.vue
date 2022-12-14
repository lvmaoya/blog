<template>
  <div class="home">
    <home-body @startClick="handleStartClick"></home-body>
    <div ref="homeMainRef">
      <home-main :thingList="thingList" @articleClick="handleArticleClick"></home-main>
    </div>
    <footer-view>
      <p><a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2022008799号-1</a></p>
    </footer-view>
  </div>
</template>

<script>
import HomeBody from "./cpns/HomeBody.vue";
import HomeMain from "./cpns/HomeMain.vue";
import FooterView from "../../components/footer/FooterView.vue";
import { ref } from "@vue/reactivity";

import { getInterestThing } from "@/service/home";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { HomeBody, HomeMain, FooterView },
  setup() {

    const homeMainRef = ref({});
    let thingList = ref([]);

    const router = useRouter();

    onBeforeMount(async () => {
      const data = await getInterestThing();
      thingList.value = data.data.data;
    });
    const handleArticleClick = (value) => {
      router.push({
        name: "Detail",
        query: {
          id: value,
        },
      });
    };
    const handleStartClick = () => {
      window.scrollTo({
        top: homeMainRef.value.offsetTop - 150,
        behavior: "smooth",
      });
    };
    return { thingList, handleArticleClick,  handleStartClick, homeMainRef };
  },
};
</script>

<style lang="scss" scoped></style>
