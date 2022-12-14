<template>
  <div class="WorkActicleItem">
    <div class="articleImage">
      <!-- :style="{ backgroundImage: ` url(${item.cover_image})` }" -->
      <!-- 图片自适应 -->
      <img :src="item.cover_image" alt="" />
    </div>
    <div class="articleContent">
      <div class="title">
        <h2>{{ item.title }}</h2>

        <div class="about">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-eye1"></use>
          </svg>
          <span>{{ item.pageview }}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianzan1"></use>
          </svg>
          <span>{{ item.prefer_num }}</span>
          <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-message"></use>
          </svg>
          <span class="last">2</span> -->
        </div>
      </div>
      <div class="description">
        <p>
          {{ item.description }}
        </p>
        <div class="date">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shizhong"></use>
          </svg>
          <span>{{ formatTime(new Date(item.published_time)) }}</span>
        </div>
      </div>
    </div>
    <!-- 移动端适配 -->
    <div class="midArticleContent">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="description">
        <p>
          {{ item.description }}
        </p>
      </div>
      <div class="data">
        <div class="about">
          <span>{{ item.pageview }} 阅读</span>
          <span>{{ item.prefer_num }} 点赞</span>
          <span class="last">2 评论</span>
        </div>
        <div class="date">
          <span>{{ formatTime(new Date(item.published_time)) }} 发布</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/utils/formatTime.js";
import { isListMounted } from "@/utils/isListMounted";

export default {
  props: {
    item: {
      required: true,
    },
  },
  setup() {
    isListMounted();
    return { formatTime };
  },
};
</script>

<style lang="scss" scoped>
.WorkActicleItem {
  border-radius: 20px;
  cursor: pointer;
  background-color: #eeeeee;
  margin-bottom: 20px;
  display: flex;
  overflow: hidden;
  min-height: 150px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f8f8f8;
  }
  &:hover img {
    filter: brightness(107%);
  }
  .articleImage {
    width: 20%;
    height: auto;
    // background-size: 100% 100%;
    img {
      width: 100%;
      height: 100%;
      vertical-align: bottom;
      transition: filter 0.3s;
    }
  }
  .articleContent {
    width: 80%;
    display: flex;
    flex-direction: column;
    .title {
      padding: 30px 10px 20px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h2 {
        font-size: 1.2em;
        font-weight: 500;
      }
      .about {
        min-width: 235px;
        padding-right: 1em;
        text-align: end;
        .icon {
          font-size: 1.2em;
          margin-right: 5px;
        }
        span:not(.last) {
          margin-right: 20px;
        }
      }
    }
    .description {
      padding: 10px 10px 20px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #555666;
      flex: 1;

      p {
        padding-right: 30px;
        font-size: 0.9em;
        font-weight: 400;
        overflow: hidden;
        white-space: normal;
        word-break: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .date {
        min-width: 192px;
        text-align: end;
        .el-icon {
          vertical-align: bottom;
        }
        span {
          padding-left: 0.5em;
          padding-right: 1em;
          vertical-align: top;
        }
      }
    }
  }
  // 移动端适配
  .midArticleContent {
    width: 100%;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    display: none;
    .title {
      font-size: 1.2em;
      font-weight: 500;
    }
    .description {
      p {
        font-size: 0.9em;
        font-weight: 400;
        overflow: hidden;
        white-space: normal;
        word-break: break-word;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .data {
      display: flex;
      justify-content: space-between;

      span {
        font-size: 14px;
      }
      .about {
        span {
          margin-right: 3px;
        }
      }
    }
  }
}
@media screen and (max-width: 770px) {
  .WorkActicleItem .articleImage,
  .WorkActicleItem .articleContent {
    display: none;
  }
  .WorkActicleItem .midArticleContent {
    display: flex;
  }
}
@media screen and (max-width: 480px) {
  .WorkActicleItem .midArticleContent {
    .title {
      font-size: 1em;
    }
    .description {
      p {
        font-size: 0.6em;
      }
    }
    .data {
      flex-direction: column;
      span {
        font-size: 0.5em;
      }
      .date {
        margin-top: 5px;
      }
    }
  }
}
</style>
