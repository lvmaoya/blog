<template>
  <div class="welcome cont">
    <div class="title">- About System</div>
    <div class="textContent">
      {{ systemStatistics.aboutSystem }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { systemStatisticsType } from "@/service/home";
import { inject } from "vue";

const systemStatistics = inject<systemStatisticsType>(
  "systemStatistics"
) as systemStatisticsType;
</script>

<style scoped lang="scss">
.welcome {
  margin-top: 10px;
  background-color: var(--light_blue);
  .textContent {
    padding: 0 23px 0px 23px;
    text-indent: 2em;
    line-height: 1.7em;
  }
  .title {
    padding: 5px;
    font-size: 1.1em;
    color: #909399;
  }
}
</style>
