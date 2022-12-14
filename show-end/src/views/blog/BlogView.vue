<!--
 * @Author: sun
 * @Date: 2022-10-14 14:37:37
 * @LastEditTime: 2022-12-06 19:48:08
 * @Description: Do not edit
-->
<template>
  <div>
    <div class="ww">
      <div class="w">
        <search-view :categoryList="categoryList" @searchBtnClick="handleSearchBtnClick"> reading & essay </search-view>
        <blog-main-content
          :blogList="blogList"
          :total="total"
          :size="size"
          :currentPage="currentPage"
          @currentChange="currentPageChange"
          @articleClick="handleArticleClick"
        ></blog-main-content>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>

<script>
import BlogMainContent from "./cpns/BlogMainContent.vue";
import { getBlogList, searchBlog } from "@/service/blog";
import { useRouter } from "vue-router";

import { ref } from "vue";
export default {
  components: { BlogMainContent },

  setup() {
    let blogList = ref([]);
    const router = useRouter();

    // 分页
    let currentPage = ref(1);
    let total = ref(0);
    let size = ref(12);
    let categoryList = ref([]);
    // 判断文章列表作了哪些操作:如果是0，作了获取所有文章的操作，如果是1，作了搜索文章的操作，如果是2，作了最近更新的操作
    let doCategory = ref(0);
    // 保存一下用户搜索的内容
    let userInput = ref("");
    // 获取用户文章列表
    const getPageListData = async () => {
      doCategory.value = 0;
      const data = await getBlogList({
        currentPage: currentPage.value,
        size: size.value,
      });
      blogList.value = data.data.data.list;
      total.value = data.data.data.total;
    };

    // 搜索文章
    const handleSearchBtnClick = async (searchData) => {
      doCategory.value = 1;
      userInput.value = searchData;

      searchData["currentPage"] = currentPage.value;
      searchData["size"] = size.value;
      const resArticlesData = await searchBlog(searchData);
      blogList.value = resArticlesData.data.data.list;
      total.value = resArticlesData.data.data.total;
    };
    getPageListData();
    const currentPageChange = (value) => {
      currentPage.value = value;
      switch (doCategory.value) {
        case 0:
          getPageListData();
          break;
        case 1:
          handleSearchBtnClick(userInput.value);
          break;
      }
    };
    const handleArticleClick = (value) => {
      router.push({
        name: "Detail",
        query: {
          id: value,
        },
      });
    };

    return {
      currentPageChange,
      blogList,
      currentPage,
      total,
      size,
      categoryList,
      handleSearchBtnClick,
      handleArticleClick,
    };
  },
};
</script>

<style lang="scss" scoped></style>
