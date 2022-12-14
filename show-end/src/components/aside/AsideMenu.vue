<template>
  <div>
    <ul id="navigationMenu">
      <li v-for="item in asideItem" :key="item.className" @click="handleAsideTagClick(item.className)">
        <a href="javascript:;" :class="item.className">
          <span class="backgroundSpan">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`${item.iconHref}`"></use>
            </svg>
          </span>
          <span class="title">{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props, { emit }) {
    const asideItem = ref([
      {
        className: "home",
        iconHref: "#icon-home-filling",
        title: "查看所有",
      },
      {
        className: "search",
        iconHref: "#icon-sousuo",
        title: "搜索文章",
      },
      {
        className: "update",
        iconHref: "#icon-gengxin",
        title: "最近更新",
      },
      {
        className: "hot",
        iconHref: "#icon-hot",
        title: "热门文章",
      },
      {
        className: "category",
        iconHref: "#icon-fenlei",
        title: "分类标签",
      },
    ]);
    const handleAsideTagClick = (value) => {
      emit("asideTagClick", value);
    };
    return { asideItem, handleAsideTagClick };
  },
};
</script>

<style scoped lang="scss">
#navigationMenu {
  position: fixed;
  margin-top: 20px;
  right: 0px;
  z-index: 5;
  li {
    list-style: none;
    height: 2.7em;
    width: 2.7em;
    margin-bottom: 5px;

    a {
      height: 100%;
      width: 100%;
      display: block;
      position: relative;

      .backgroundSpan {
        height: 100%;
        width: 100%;
        display: block;
        position: absolute;
        line-height: 2.9em;
        text-align: center;
        border-radius: 9px 0 0 9px;

        z-index: 10;
        .icon {
          width: 1.3em;
          height: 1.3em;
          color: white;
        }
      }

      .title {
        position: absolute;
        display: block;
        width: 100px;
        left: 0px;
        overflow: hidden;
        transition: 1s;
        height: 100%;
        font-size: 1em;
        font-weight: 500;
        letter-spacing: 0.6px;
        line-height: 2.7em;
        text-align: center;
        border-radius: 9px 0 0 9px;
        color: white;
      }
    }
    .home {
      .backgroundSpan {
        background-color: #ffbd39;
      }
      .title {
        background-color: #ffbd39;
      }
    }
    .search {
      .backgroundSpan {
        background-color: #e61c5d;
      }
      .title {
        background-color: #e61c5d;
      }
    }
    .update {
      .backgroundSpan {
        background-color: #930077;
      }
      .title {
        background-color: #930077;
      }
    }
    .hot {
      .backgroundSpan {
        background-color: #3a0088;
      }
      .title {
        background-color: #3a0088;
      }
    }
    .category {
      .backgroundSpan {
        background-color: #f95959;
      }
      .title {
        background-color: #f95959;
      }
    }
    &:hover .title {
      left: -85px;
      width: 100px;
    }
  }
}

@media screen and (max-width: 770px) {
  #navigationMenu {
    display: none;
  }
}
</style>
