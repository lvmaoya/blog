<!--
 * @Author: sun
 * @Date: 2022-11-23 15:26:46
 * @LastEditTime: 2022-12-06 20:15:47
 * @Description: Do not edit
-->
<template>
  <div class="category">
    <ul>
      <li v-for="item in categoryList" :key="item.category_id" @click="handleCategoryClick(item.category_id)">
        <span>{{ item.category_name }}</span>
      </li>
      <li class="cancel">
        <span @click="handleCancelClick">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cha"></use>
          </svg>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getArticleCategoryList } from "@/service/work";
import { ref } from "vue";
export default {
  emits: ["cancelClick", "handleCategoryClick"],
  setup(props, { emit }) {
    // 页面类别
    let fatherPageCategory = "tech_article";
    // --------------------------
    // 文章类别列表
    let categoryList = ref(0);
    // 获取用户文章类别
    const getArticleCategory = async () => {
      const categoryListData = await getArticleCategoryList(fatherPageCategory);
      categoryList.value = categoryListData.data.data.categoryList;
    };
    const handleCancelClick = () => {
      emit("cancelClick");
    };
    const handleCategoryClick = (value) => {
      emit("handleCategoryClick", value);
    };
    getArticleCategory();

    return { categoryList, handleCancelClick, handleCategoryClick };
  },
};
</script>

<style lang="scss" scoped>
.category {
  width: 100%;
  ul {
    display: flex;
    justify-content: space-between;
    // padding: 0 0.8em;
    border-radius: 7px;
    background-color: whitesmoke;
    flex-wrap: wrap;
    padding: 10px;
    margin-top: 7px;
    li {
      cursor: pointer;
      height: 1.5em;
      line-height: 1.5em;
      padding: 0 3px;
      span {
        color: gray;
        box-sizing: border-box;
        border-bottom: 1px solid whitesmoke;
        transition: border-bottom 0.3s;
      }
      &:not(.cancel):hover span {
        border-bottom: 1px solid gray;
      }
    }
    .cancel {
      .icon {
        font-size: 0.8em;
        border: 1px solid whitesmoke;
        border-radius: 50%;
        &:hover {
          border: 1px solid gray;
        }
      }
    }
  }
}
</style>
