<template>
  <div>
    <aside-menu @aside-tag-click="handleAsideTagClick"></aside-menu>
    <div class="ww">
      <div class="w">
        <search-view @searchBtnClick="HandleSearchBtnClick" :isSearchInputFocus="isSearchInputFocus">
          learning & code
        </search-view>
        <AsideMenuMiniScreen @aside-tag-click="handleAsideTagClick"></AsideMenuMiniScreen>
        <div class="categoryView" :style="`${isCategoryVisible ? 'height:auto;opacity:1' : 'height:0'}`">
          <CategoryView
            @cancel-click="handleCategoryCancel"
            @handle-category-click="handleCategoryClick"
          ></CategoryView>
        </div>
        <work-acticle-content
          :articleList="articleList"
          :total="total"
          :size="size"
          :currentPage="currentPage"
          @currentChange="currentPageChange"
          @articleClick="handleArticleClick"
        ></work-acticle-content>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>

<script>
import WorkActicleContent from "./cpns/WorkActicleContent.vue";
import SearchView from "@/components/search/searchView.vue";
import AsideMenu from "@/components/aside/AsideMenu.vue";
import {
  getArticleList,
  searchArticle,
  getRecentArticleList,
  getHotArticleList,
  getArticleByCategoryData,
} from "@/service/work";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import CategoryView from "./cpns/CategoryView.vue";

export default {
  components: { WorkActicleContent, SearchView, AsideMenu, CategoryView },
  setup() {
    let isSearchInputFocus = ref(true);
    // 判断文章列表作了哪些操作:如果是0，作了获取所有文章的操作，如果是1，作了搜索文章的操作，如果是2，作了最近更新的操作
    let doCategory = ref(0);
    // 保存一下用户搜索的内容
    let userInput = ref("");
    const router = useRouter();
    // 分页
    let currentPage = ref(1);
    let total = ref(0);
    let size = ref(20);
    // 文章列表
    let articleList = ref([]);
    // category是否显示
    let isCategoryVisible = ref(false);
    // 用户点击完类别保存的用户id,保存起来是为了点击分页时用得到
    let category_id = ref("");
    // 获取用户文章列表
    const getPageListData = async () => {
      doCategory.value = 0;
      const PageListdata = await getArticleList({
        currentPage: currentPage.value,
        size: size.value,
      });
      articleList.value = PageListdata.data.data.list;
      total.value = PageListdata.data.data.total;
    };
    getPageListData();
    // 搜索文章
    const HandleSearchBtnClick = async (searchData) => {
      doCategory.value = 1;
      userInput.value = searchData;
      searchData["currentPage"] = currentPage.value;
      searchData["size"] = size.value;

      const resArticlesData = await searchArticle(searchData);
      articleList.value = resArticlesData.data.data.list;
      total.value = resArticlesData.data.data.total;
    };
    // 获取最近更新文章
    const getRecentArticleData = async () => {
      doCategory.value = 2;
      const recentArticleData = await getRecentArticleList({
        currentPage: currentPage.value,
        size: size.value,
      });
      articleList.value = recentArticleData.data.data.list;
      total.value = recentArticleData.data.data.total;
    };
    // 获取热门文章
    const getHotArticleData = async () => {
      doCategory.value = 3;
      const hotArticleData = await getHotArticleList({
        currentPage: currentPage.value,
        size: size.value,
      });
      articleList.value = hotArticleData.data.data.list;
      total.value = hotArticleData.data.data.total;
    };
    // 分类检索文章
    const getArticleByCategory = async () => {
      doCategory.value = 4;
      const articleByCategoryData = await getArticleByCategoryData({
        category_id: category_id.value,
        currentPage: currentPage.value,
        size: size.value,
      });
      articleList.value = articleByCategoryData.data.data.list;
      total.value = articleByCategoryData.data.data.total;
    };
    const currentPageChange = (value) => {
      currentPage.value = value;
      switch (doCategory.value) {
        case 0:
          getPageListData();
          break;
        case 1:
          HandleSearchBtnClick(userInput.value);
          break;
        case 2:
          getRecentArticleData();
          break;
        case 3:
          getHotArticleData();
          break;
        case 4:
          getArticleByCategory();
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
    const handleAsideTagClick = (value) => {
      currentPage.value = 1;
      switch (value) {
        case "home":
          HandleSearchBtnClick({ searchData: "" });
          break;
        case "search":
          isSearchInputFocus.value = !isSearchInputFocus.value;
          break;
        case "update":
          getRecentArticleData();
          break;
        case "hot":
          getHotArticleData();
          break;
        case "category":
          isCategoryVisible.value = !isCategoryVisible.value;
          break;
      }
    };
    const handleCategoryCancel = () => {
      isCategoryVisible.value = false;
    };
    const handleCategoryClick = (id) => {
      category_id.value = id;
      getArticleByCategory();
    };
    return {
      articleList,
      currentPage,
      total,
      size,
      currentPageChange,
      getPageListData,
      handleCategoryCancel,
      HandleSearchBtnClick,
      handleArticleClick,
      handleAsideTagClick,
      isSearchInputFocus,
      isCategoryVisible,
      handleCategoryClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.categoryView {
  height: 0px;
  opacity: 0;
  transition: all 1s;
  margin-bottom: 1em;
  overflow: hidden;
}
@media screen and (max-width: 770px) {
  .w .workActicleSearch {
    margin-bottom: 40px;
  }
}
</style>
