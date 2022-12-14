<template>
  <div class="WorkActicleContent">
    <work-acticle-item
      v-for="item in articleList"
      :key="item.id"
      :item="item"
      @click="handleArticleClick(item.article_id)"
    ></work-acticle-item>
    <div class="pagination" v-show="isListContentMounted">
      <el-pagination
        :page-size="size"
        :disabled="false"
        :current-page="currentPage"
        background
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import WorkActicleItem from "./WorkActicleItem.vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  components: { WorkActicleItem },
  props: {
    articleList: {
      required: true,
    },
    total: {
      required: true,
    },
    currentPage: {
      required: true,
    },
    size: {
      required: true,
    },
  },
  emits: ["articleClick", "currentChange"],

  setup(props, { emit }) {
    const store = useStore();

    let isListContentMounted = computed(() => store.state.isListContentMounted);
    const handleCurrentChange = (value) => {
      emit("currentChange", value);
    };
    const handleArticleClick = (value) => {
      emit("articleClick", value);
    };
    return { handleCurrentChange, handleArticleClick, isListContentMounted };
  },
};
</script>

<style lang="scss" scoped>
.WorkActicleContent {
  padding-bottom: 50px;
  .pagination {
    display: flex;
    justify-content: center;
    padding-top: 2em;
    .is-active {
      background-color: gray !important;
    }
  }
}
</style>
