<!--
 * @Author: sun
 * @Date: 2022-10-17 14:39:00
 * @LastEditTime: 2022-12-06 08:53:01
 * @Description: Do not edit
-->
<template>
  <div class="blogMainItem">
    <div class="img">
      <a href="javascript:;"><img :src="blogItem.cover_image" alt="" /></a>
    </div>
    <div class="articleDetail">
      <div class="title">
        <span>{{ blogItem.title }}</span>
      </div>
      <div class="date">
        <span> {{ formatTime(new Date(blogItem.published_time)) }}</span>
      </div>
      <div class="description">
        {{ blogItem.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/formatTime";
import { isListMounted } from "@/utils/isListMounted";

export default {
  props: ["blogItem"],
  setup() {
    isListMounted();
    return { formatTime };
  },
};
</script>

<style lang="scss" scoped>
.blogMainItem {
  width: 24.9%;
  min-width: 284px;
  padding: 0 7px;
  margin-bottom: 1.4em;
  box-sizing: border-box;
  .img {
    width: 100%;
    height: auto;
    margin: 0 0 2em;
    img {
      width: 100%;
    }
  }
  .articleDetail {
    padding-right: 15px;
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 0.1em;
    margin: 0 0 1em;
    // cursor: pointer;
    box-sizing: border-box;

    span {
      cursor: pointer;
      font-size: 1.1em;
      font-weight: 500;
      color: #4d4d4d;
      border-bottom: 1px solid white;
      transition: all 0.2s;
      &:hover {
        border-bottom: 1px solid #4d4d4d;
      }
    }
  }
  .date {
    padding: 0 0 1.4em;
    span {
      display: block;
      font-style: italic;
      font-size: 0.9em;
      font-weight: 400;
      color: #555666;
    }
  }
  .description {
    font-size: 0.9em;
    line-height: 1.4em;
    font-weight: 400;
    padding: 0 0 1.4em;
    color: #555666;
    overflow: hidden;
    white-space: normal;
    word-break: break-word;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }
}
</style>
