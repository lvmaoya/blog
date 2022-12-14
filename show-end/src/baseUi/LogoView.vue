<template>
  <div class="logo" @click="handleLogoClick">LVMAOYA</div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const handleLogoClick = () => {
      router.push({
        name: "Home",
      });
    };
    return { handleLogoClick };
  },
};
</script>

<style lang="scss" scoped>
.logo {
  // width: 10%;
  font-size: 1.2em;
  cursor: pointer;
  color: gray;
}
</style>
