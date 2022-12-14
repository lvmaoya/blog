<template>
  <div class="homeMain">
    <div class="main">
      <div class="content">
        <div class="homeMainItem" v-for="item in thingList" :key="item.id" @click="handleArticleClick(item.article_id)">
          <a href="javascript:;">
            <div class="image">
              <!-- :style="{ backgroundImage: `url(${item.cover_image})` }" -->
              <img :src="item.cover_image" alt="" />
            </div>
            <div class="itemTitle">
              <h4>{{ item.title }}</h4>
            </div>
            <div class="description">
              <p>{{ item.description }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isListMounted } from "@/utils/isListMounted";

export default {
  props: {
    thingList: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  emits: ["articleClick"],
  setup(props, { emit }) {
    isListMounted();

    const handleArticleClick = (value) => {
      emit("articleClick", value);
    };
    return { handleArticleClick };
  },
};
</script>

<style lang="scss" scoped>
.homeMain {
  border-bottom: 1.2px solid rgb(189, 188, 188);
  background: #fff;
  position: relative;
  z-index: 2;
  .main {
    width: 80%;
    margin: 0 auto;

    .content {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .homeMainItem {
        width: 33.3%;
        box-sizing: border-box;
        margin-bottom: 30px;
        padding: 0 10px;
        min-width: 370px;
        a {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 15px;
          overflow: hidden;
          background: #f7f7f7;

          .image {
            height: calc(25vw * 9 / 16);
            min-height: 220px;
            overflow: hidden;
          }
          img {
            width: 100%;
            transform: scale(1);
            transition: all 1s ease 0s;
          }
          .itemTitle h4 {
            font-size: 1.2em;
            color: black;
            padding: 1.3em 0.7em 0.8em 0.7em;
            word-spacing: 2px;
            line-height: 1.2em;
            font-weight: 500;
          }
          .description {
            padding: 0.5em 0.7em 0.8em 0.7em;

            p {
              margin: 0;
              width: 100%;
              font: 16px "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC",
                "WenQuanYi Micro Hei", sans-serif;
              font-size: 0.9em;
              height: 7em;
              line-height: 1.5em;
            }
          }
        }
        &:hover .image > img {
          transform: scale(1.1);
          transition: all 1s ease 0s;
        }
        &:hover a {
          transition: all 1s ease 0s;
          box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
        }
      }
    }
  }
}
</style>
