<!--
 * @Author: sun
 * @Date: 2022-10-17 14:38:27
 * @LastEditTime: 2022-12-05 21:26:02
 * @Description: Do not edit
-->
<template>
  <div class="blogMainContent">
    <blog-main-item
      v-for="item in blogList"
      :key="item.article_id"
      :blogItem="item"
      @click="handleArticleClick(item.article_id)"
    ></blog-main-item>
    <div class="pagination" v-if="isListContentMounted">
      <el-pagination
        :page-size="size"
        :current-page="currentPage"
        :disabled="false"
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import BlogMainItem from "./BlogMainItem.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  props: {
    blogList: {
      required: true,
    },
    total: {
      required: true,
    },
    size: {
      required: true,
    },
    currentPage: {
      required: true,
    },
  },
  emits: ["articleClick", "currentChange"],

  components: { BlogMainItem },
  setup(props, { emit }) {
    const store = useStore();

    let isListContentMounted = computed(() => store.state.isListContentMounted);

    const handleCurrentChange = (value) => {
      emit("currentChange", value);
    };
    const handleArticleClick = (value) => {
      emit("articleClick", value);
    };
    return { handleArticleClick, handleCurrentChange, isListContentMounted };
  },
};
</script>

<style lang="scss" scoped>
.blogMainContent {
  width: 100%;
  padding-top: 3em;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 2em;
  }
}
</style>
