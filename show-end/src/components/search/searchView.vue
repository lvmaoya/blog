<!--
 * @Author: sun
 * @Date: 2022-10-17 11:00:38
 * @LastEditTime: 2022-12-11 21:11:29
 * @Description: Do not edit
-->
<template>
  <div class="workActicleSearch">
    <div class="pageCategroy">
      <slot> </slot>
    </div>

    <el-input v-model="searchData" placeholder="请输入您要搜索的内容..." size="large" ref="searchInput">
      <template #append>
        <el-button @click="handleSearchBtnClick">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo1"></use>
          </svg>
        </el-button>
      </template>
    </el-input>
    <span class="pageCategroy"></span>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    isSearchInputFocus: {
      type: Boolean,
    },
  },
  emits: ["searchBtnClick"],
  setup(props, { emit }) {
    const searchInput = ref();
    watch(
      () => props.isSearchInputFocus,
      () => {
        searchInput.value.focus();
      }
    );
    const searchData = ref("");
    const handleSearchBtnClick = () => {
      emit("searchBtnClick", { searchData: searchData.value });
    };
    return { searchData, handleSearchBtnClick, searchInput };
  },
};
</script>

<style lang="scss" scoped>
.workActicleSearch {
  width: 100%;
  margin: 0 auto;
  display: flex;
  // align-items: center;
  margin-bottom: 11vh;
  justify-content: center;
  .pageCategroy {
    flex: 1;
    font-size: 1.4em;
    line-height: 1.3em;
    color: #4d4d4d;
    font-weight: 400;
  }
  .el-input {
    flex: 2;
    width: 50%;
    .icon {
      width: 1.3em;
      height: 1.3em;
    }
  }
  :deep(.el-input__wrapper) {
    border: 2px solid gray;
    border-right: none;
    border-radius: 10px 0 0 10px;
  }
  :deep(.el-input-group__append) {
    box-sizing: border-box;
    border: 2px solid gray;
    border-left: none;
    border-radius: 0 10px 10px 0;
  }
  :deep(.is-focus) {
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  }
}
@media screen and (max-width: 1200px) {
  .pageCategroy {
    display: none;
  }
  .workActicleSearch .el-input {
    width: 80%;
    height: 38px;

    flex: none;
  }
}
</style>
